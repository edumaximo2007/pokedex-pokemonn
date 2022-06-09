import React, { Component } from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./contatoTexto.scss";
const phone = <FontAwesomeIcon icon={faPhone} />
const mail = <FontAwesomeIcon icon={ faEnvelope } />
const tel = "tel:+5548991472433";
const email = "mailto:edumaximo2007@hotmail.com";
const linkedin ="https://www.linkedin.com/in/eduardo-m-07383221b/";
export class ContatoTexto extends Component{
    render(){
        return(
         <div className="Contato__texto">
             <h1 className="Contato__titulo">Contato</h1>
             <div className="Contato__links">
                <a  className="contato__links___tel" href={tel}>{phone} +55(48)99147-2433</a>
                <a className="contato__links___email" href={email}>{mail} Edumaximo2007@hotmail.com</a>
                <a className="contato__links__linkedin" href={linkedin}><FaLinkedin/> eduardo-m-07383221b</a>
             </div>
         </div>   
        )
    }
}

export default ContatoTexto;