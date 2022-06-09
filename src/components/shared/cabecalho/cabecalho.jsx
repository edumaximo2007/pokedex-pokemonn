import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Offcanvas} from "react-bootstrap";
import style from"./style.module.scss";
import "../../../global.scss";

 export function Cabecalho(){
        return(           
               <header className={style.cabecalho}>
                   <div className={style.cabecalho__logo}>
                       <Link className={style.cabecalho__logo___link} to="/">Home</Link>
                   </div>
                    {[true, 'lg' ].map((expand) => (
                        <Navbar key={expand} bg="white" expand={expand} className="mb-3">
                        <Container fluid>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                <ul className={style.nav__list }>
                                <Nav.Link>
                                    <li className={style.nav__item}>
                                        <Link className={style.nav__link} to="/">Home</Link>
                                    </li>
                                </Nav.Link>
                                <Nav.Link>
                                    <li className={style.nav__item}>
                                        <Link className={style.nav__link} to="/pokemons">Pokemons</Link>
                                    </li>
                                </Nav.Link>
                                <Nav.Link>
                                    <li className={style.nav__item}>
                                        <Link className={style.nav__link} to="/contato">Contato</Link>
                                    </li>   
                                </Nav.Link>
                                </ul>    
                                </Nav>
                            </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                        </Navbar>
                    ))}
               </header>       
           )   
}

