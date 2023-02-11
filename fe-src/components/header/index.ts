import { Router } from "@vaadin/router"
import { state } from "../../state"

export class Header extends HTMLElement {
  connectedCallback() {
    this.render()

  }
  render() {
    const cs = state.getState()
    const div = document.createElement("div")
    const style = document.createElement("style")
    const imgMenu = require("../../assets/menu.svg")
    const imgLogo = require("../../assets/logo.svg")
    const imgCruz = require("../../assets/cruz.svg")
    style.textContent = `
        .contenedor{
            width:auto;
            background-color:#5bff005c;
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding:15px;
        }
        .boton-menu,.boton-menu__cierre{
            position: absolute;
            right: 8px;
            opacity: 0;
            height: 60px;
            width: 66px;
            z-index: 1;
        }
    .img{
        position: absolute;
        right: 23px;
        top: 15px;
    }
      .ventana{
        display:none;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #050e2d;
      }
      .ventana__contenido{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height:100%;
       
      }
      .ventana__text{
        text-decoration:none;
        color:white;
        margin: 30px;
        font-size:24px;
        text-align:center;
      }
      .boton-menu__cierre{

      }
        `
    this.appendChild(style)
    div.innerHTML = `
      
      <img src=${imgLogo}>
      
     
      <button class="boton-menu"></button>
         <div class="ventana">
          <button class="boton-menu__cierre">cruz</button>
          <img class="img" src=${imgCruz}>
            <div class="ventana__contenido">
              <a class="ventana__text user"href="">Mis datos</a>
              <a class="ventana__text"href="">Mis mascotas <br> reportadas</a>
              <a class="ventana__text"href="">Reportar <br> mascota</a>
            </div>
         </div>
      <img src=${imgMenu}>
      
        `
    div.classList.add("contenedor")
    const loginEl = document.querySelector(".login") as any
    const formCreateEl = document.querySelector(".formCreate") as any
    const botonEl = div.querySelector(".boton-menu")
    const botonCierreEl = div.querySelector(".boton-menu__cierre")
    const userEl = div.querySelector(".user")
    const ventanaEl = div.querySelector(".ventana") as any

    botonEl?.addEventListener("click", () => {
      ventanaEl.style.display = "block"
      if (location.pathname == "/login") {
        loginEl.style.display = "none"
      }
      if (location.pathname == "/create-user") {
        formCreateEl.style.display = "none"
      }

    })
    botonCierreEl?.addEventListener("click", () => {
      ventanaEl.style.display = "none"
      if (location.pathname == "/login") {
        loginEl.style.display = "flex"
      }
      if (location.pathname == "/create-user") {
        formCreateEl.style.display = "flex"
      }

    })
    userEl?.addEventListener("click", () => {
      if (cs.user.name == "") {

        Router.go("/login")
      } else {
        console.log("hay user");
      }

    })
    this.appendChild(div)
  }
}
customElements.define("header-custom", Header)