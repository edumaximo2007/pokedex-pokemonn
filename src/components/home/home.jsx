import React,{ Component} from "react";
import "./home.scss"
import { Cabecalho } from "../shared/cabecalho/cabecalho";
import { HomelTexto } from "./homeTextos/homeTexto";
import HomelImagem from "./homeImagem/homeImagem";
export class Home extends Component {
    render(){
        return(
            <div>
                <Cabecalho />
                <main className="home">
                   <HomelTexto />
                   <HomelImagem />
                </main>
            </div>
        )
    }
}
