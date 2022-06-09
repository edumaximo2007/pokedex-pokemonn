'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const debounce = require('lodash.debounce');
const escapeStringRegExp = require('escape-string-regexp');
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        toggleNativeFeatures(userEditorSettings);
        /*NOTE: we should only create 1 declaration type object once, as done here.
          If we recreate it in 'updateDecorations' each time, when we removeDecorations,
          they will reference diff objects.
        */
        let fullDecorationType = getDecorationTypeFromConfig({ top: true, right: true, bottom: true, left: true });
        let decorationTypesMap = new Map([
            [fullDecorationType, []]
        ]);
        let activeEditor = vscode_1.window.activeTextEditor;
        let lastSelectionText = '';
        let debounced_updateDecorations = debounce(updateDecorations, 350);
        /**
         * This is required. When we create a new tab in our editor, we want
         * to update the activeEditor.
         */
        vscode_1.window.onDidChangeActiveTextEditor(() => {
            if (activeEditor)
                return;
            activeEditor = vscode_1.window.activeTextEditor;
        });
        /**
         * Any time we move anywhere around our editor, we want to trigger
         * a decoration.
         */
        let handleSelectionChange = () => {
            const isMultiLineSelection = activeEditor.selection.isSingleLine === true ? false : true;
            if (isMultiLineSelection)
                return;
            //reset decorations on empty selection
            if (vscode_1.window.activeTextEditor.selection.isEmpty) {
                vscode_1.window.visibleTextEditors.forEach((editor) => {
                    decorationTypesMap.set(fullDecorationType, []);
                    editor.setDecorations(fullDecorationType, []);
                });
                lastSelectionText = getActiveEditorSelectionText();
                return;
            }
            //single line selection
            activeEditor = vscode_1.window.activeTextEditor;
            debounced_updateDecorations({ isMultiLineSelection: false });
        };
        vscode_1.window.onDidChangeTextEditorSelection(handleSelectionChange);
        function updateDecorations({ updateAllVisibleEditors, isMultiLineSelection }) {
            const currentSelectionText = getActiveEditorSelectionText();
            const selectionContainsSpecialChars = /[^[A-Za-z[0-9]/.test(currentSelectionText);
            const selectionIsSubstring = getWordFromSubstringSelection().includes(currentSelectionText) && currentSelectionText.length < getWordFromSubstringSelection().length;
            let lines = [];
            if (currentSelectionText.length < 2)
                return;
            //remove decorations if updating & overlapping (for single selections)
            if (currentSelectionText.includes(lastSelectionText) || lastSelectionText.includes(currentSelectionText)) {
                vscode_1.window.visibleTextEditors.forEach((editor) => {
                    decorationTypesMap.set(fullDecorationType, []);
                    editor.setDecorations(fullDecorationType, []);
                });
            }
            //single line selection
            let regexPattern;
            let wholeWorldPattern;
            let nonWholeWorldPattern;
            let decorationType = fullDecorationType;
            if (selectionContainsSpecialChars || selectionIsSubstring) {
                nonWholeWorldPattern = `${escapeStringRegExp(currentSelectionText)}`;
                regexPattern = nonWholeWorldPattern;
            }
            else {
                wholeWorldPattern = `\\b${escapeStringRegExp(currentSelectionText)}\\b`;
                regexPattern = wholeWorldPattern;
            }
            vscode_1.window.visibleTextEditors.forEach((editor, index) => {
                const editorText = editor.document.getText();
                const regex = new RegExp(regexPattern, 'gi');
                let match;
                while (match = regex.exec(editorText)) {
                    const startPos = activeEditor.document.positionAt(match.index);
                    const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                    const newDecoration = { range: new vscode_1.Range(startPos, endPos) };
                    decorationTypesMap.get(decorationType).push(newDecoration);
                }
                //loop over our map & set the decorations
                decorationTypesMap.forEach((decorations, decorationType) => {
                    editor.setDecorations(decorationType, decorations);
                });
            });
            lastSelectionText = currentSelectionText;
        }
        vscode_1.workspace.onDidChangeConfiguration(() => {
            //clear all decorations
            fullDecorationType.dispose();
            fullDecorationType = getDecorationTypeFromConfig({ top: true, right: true, bottom: true, left: true });
            updateDecorations({ updateAllVisibleEditors: true, isMultiLineSelection: false });
        });
    });
}
exports.activate = activate;
function getActiveEditorSelectionText() {
    let activeEditor = vscode_1.window.activeTextEditor;
    if (!activeEditor)
        return;
    const selectionRange = new vscode_1.Range(activeEditor.selections[0].start, activeEditor.selections[0].end);
    const selectionText = activeEditor.document.getText(selectionRange);
    return selectionText;
}
function getWordFromSubstringSelection() {
    let activeEditor = vscode_1.window.activeTextEditor;
    if (!activeEditor)
        return;
    const wholeWordRange = activeEditor.document.getWordRangeAtPosition(activeEditor.selection.start);
    return activeEditor.document.getText(wholeWordRange);
}
const userEditorSettings = {
    occurencesHighlight: vscode_1.workspace.getConfiguration('editor').get('occurrencesHighlight'),
    selectionHighlight: vscode_1.workspace.getConfiguration('editor').get('selectionHighlight')
};
// this method is called when your extension is deactivated
function deactivate() {
    toggleNativeFeatures(userEditorSettings, true);
}
exports.deactivate = deactivate;
//UTILITIES
function getDecorationTypeFromConfig({ top, right, bottom, left }) {
    const config = vscode_1.workspace.getConfiguration("highlightSelections");
    const borderColor = config.get("borderColor");
    const borderStyle = config.get("borderStyle");
    let borderWidth = config.get("borderWidth");
    //highlight all border edges
    if (top && right && bottom && left) {
        borderWidth = `${borderWidth}`;
    }
    else if (top && right && left && !bottom) {
        borderWidth = `${borderWidth} ${borderWidth} 0 ${borderWidth}`;
    }
    else if (right && left && bottom && !top) {
        borderWidth = `0 ${borderWidth} ${borderWidth} ${borderWidth}`;
    }
    else if (right && left && !top && !bottom) {
        borderWidth = `0 ${borderWidth} 0 ${borderWidth}`;
    }
    const decorationType = vscode_1.window.createTextEditorDecorationType({
        overviewRulerLane: vscode_1.OverviewRulerLane.Center,
        borderWidth: `${borderWidth}`,
        borderStyle: `${borderStyle}`,
        borderColor
    });
    return decorationType;
}
/**
 * Turn off occurencesHighlight & selectionHighlight settings IF on.
 * If abovementioned settings are off, leave off
 */
function toggleNativeFeatures(userEditorSettings, reset = false) {
    let { occurencesHighlight, selectionHighlight } = userEditorSettings;
    if (occurencesHighlight) {
        vscode_1.workspace.getConfiguration().update('editor.occurrencesHighlight', false, true);
    }
    if (selectionHighlight) {
        vscode_1.workspace.getConfiguration().update('editor.selectionHighlight', false, true);
    }
    //when the extentension is deactivated, set the settings back to their original values
    if (reset) {
        vscode_1.workspace.getConfiguration().update('editor.occurrencesHighlight', occurencesHighlight, true);
        vscode_1.workspace.getConfiguration().update('editor.occurrencesHighlight', selectionHighlight, true);
    }
}
//# sourceMappingURL=extension.js.map