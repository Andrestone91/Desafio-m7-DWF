import { Router } from "@vaadin/router"
import { state } from "../../state"

export class MyData extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const div = document.createElement("div")
        const style = document.createElement("style")
        const cs = state.getState()
        style.textContent = `
        .contenedor-principal {
            width: 80%;
            margin: auto;
            display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
          }
        .title-welcome{
            font-size:40px;
        }
        .btn-ubicacion{
        }
        `
        this.appendChild(style)
        div.innerHTML = `
        <header-custom></header-custom>
        <div class="contenedor-principal">
        <h1 class="title-welcome">Mis Datos</h1>
        <h2>Nombre: ${cs.user.name}</h2>
        <h2>Email: ${cs.user.email}</h2>
        <h2>contraseña: ****</h2>
        <button class="btn-editar">Editar datos</button>
        <button class="btn-volver">Volver</button>
        <button class="btn-Logout">Cerrar sesión</button>
    </div>
        `
        this.appendChild(div)
        const botonEl = div.querySelector(".btn-editar")
        botonEl?.addEventListener("click", () => {
            Router.go("/edit-user")
        })
        const botonVEl = div.querySelector(".btn-volver")
        botonVEl?.addEventListener("click", () => {
            if (cs.lng == "") {
                Router.go("/")
            }
            if (cs.lng !== "") {
                state.loadPets(() => {
                    Router.go("/lost-pets")
                })
            }
        })
        const botonOutEl = div.querySelector(".btn-Logout")
        botonOutEl?.addEventListener("click", () => {

            state.setState({
                ...cs,
                user: {
                    name: "",
                    email: "",
                    password: "",
                    token: ""
                },
            })
            Router.go("/login")
        })
    }
}
customElements.define("data-page", MyData)