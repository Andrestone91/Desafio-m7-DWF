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
        .nav-custom{
          display: flex;
        }
        .img{
            position: absolute;
            right: 23px;
            top: 15px;
         }
         @media (min-width: 960px) {
         .burger{
          display:none;
         }
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
      .boton-menu{

      }
      @media (min-width: 960px) {
        .boton-menu{
          display: none;
        }
      }

      .text-nav{
        font-family: "Poppins", sans-serif;
        font-size: 24px;
        display: none;
        text-decoration:none;
        color:black;
        font-size: 18px;
      }
      @media (min-width: 960px) {
        .text-nav {
          display: block;
          padding:0 20px;
          
        }
      
      }
        `
    this.appendChild(style)
    div.innerHTML = `
      
      <img  src=${imgLogo}>
      <div class="nav-custom">

      <a href="" class="text-nav">Inicio</a>
      <a href="" class="text-nav">Mis datos</a>
      <a href="" class="text-nav">Mis mascotas reportadas</a>
      <a href="" class="text-nav">Reportar mascota</a>
    
   
      </div>
      <button class="boton-menu"></button>
         <div class="ventana">
          <button class="boton-menu__cierre">cruz</button>
          <img class="img" src=${imgCruz}>
            <div class="ventana__contenido">
              <a class="ventana__text inicio"href="">Inicio</a>
              <a class="ventana__text user"href="">Mis datos</a>
              <a class="ventana__text"href="">Mis mascotas reportadas</a>
              <a class="ventana__text"href="">Reportar mascota</a>
            </div>
         </div>
      <img class="burger"src=${imgMenu}>
      
        `
    div.classList.add("contenedor")

    const loginEl = document.querySelector(".login") as any
    const formCreateEl = document.querySelector(".formCreate") as any
    const mapEl = document.querySelector(".contenedor-map") as any
    const navEl = div.querySelector(".nav-custom")?.children as any
    const botonEl = div.querySelector(".boton-menu")
    const botonCierreEl = div.querySelector(".boton-menu__cierre")
    const menuEl = div.querySelector(".ventana__contenido")?.children as any

    const ventanaEl = div.querySelector(".ventana") as any

    botonEl?.addEventListener("click", () => {
      ventanaEl.style.display = "block"
      if (location.pathname == "/login") {
        loginEl.style.display = "none"
      }
      if (location.pathname == "/create-user" || location.pathname == "/edit-user" || location.pathname == "/new-password") {
        formCreateEl.style.display = "none"
      }
      if (location.pathname == "/new-report" || location.pathname == "/edit") {
        mapEl.style.display = "none"
      }


    })
    botonCierreEl?.addEventListener("click", () => {
      ventanaEl.style.display = "none"
      if (location.pathname == "/login") {
        loginEl.style.display = "flex"
      }
      if (location.pathname == "/create-user" || location.pathname == "/edit-user" || location.pathname == "/new-password") {
        formCreateEl.style.display = "flex"
      }
      if (location.pathname == "/new-report" || location.pathname == "/edit") {
        mapEl.style.display = "block"
      }

    })
    for (const m of menuEl) {
      m.addEventListener("click", () => {

        if (cs.user.name == "") {
          if (m.innerText == "Inicio") {
            if (cs.lng == "") {
              Router.go("/")
            }
            if (cs.lng !== "") {
              Router.go("/lost-pets")
            }
          } else {
            Router.go("/login")
          }
        }
        if (cs.user.name !== "") {
          if (m.innerText == "Inicio") {
            if (cs.lng == "") {
              Router.go("/")
            }
            if (cs.lng !== "") {
              state.loadPets(() => {
                Router.go("/lost-pets")
              })
            }
          }
          else if (m.innerText == "Mis datos") {
            Router.go("/my-user")
          }
          else if (m.innerText == "Mis mascotas reportadas") {
            state.myReports(() => {
              Router.go("/my-reports")
            })
          }
          else if (m.innerText == "Reportar mascota") {
            Router.go("/new-report")
          }
        }
      })
    }

    for (const n of navEl) {
      n.addEventListener("click", () => {
        if (cs.user.name == "") {
          if (n.innerText == "Inicio") {
            if (cs.lng == "") {
              Router.go("/")
            }
            if (cs.lng !== "") {
              Router.go("/lost-pets")
            }
          } else {
            Router.go("/login")
          }
        }
        if (cs.user.name !== "") {
          if (n.innerText == "Inicio") {
            if (cs.lng == "") {
              Router.go("/")
            }
            if (cs.lng !== "") {
              state.loadPets(() => {
                Router.go("/lost-pets")
              })
            }
          }
          else if (n.innerText == "Mis datos") {
            Router.go("/my-user")
          }
          else if (n.innerText == "Mis mascotas reportadas") {
            state.myReports(() => {
              Router.go("/my-reports")
            })
          }
          else if (n.innerText == "Reportar mascota") {
            Router.go("/new-report")
          }
        }
      })

    }
    this.appendChild(div)
  }
}

customElements.define("header-custom", Header)