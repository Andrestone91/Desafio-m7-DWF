import { Router } from "@vaadin/router"
import { state } from "../../state"

export class Welcome extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const div = document.createElement("div")
        const style = document.createElement("style")
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
            font-family: 'Poppins', sans-serif;
        }
        .btn-ubicacion{
            background: #5bff005c;
            padding: 10px;
            border: none;
        }
        
        `
        this.appendChild(style)
        div.innerHTML = `
        <header-custom></header-custom>
        <div class="contenedor-principal">
        <h1 class="title-welcome">Mascotas perdidas cerca tuyo</h1>
        <p>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
        <button class="btn-ubicacion">Dar mi ubicacion</button>
        </div>
        `
        this.appendChild(div)


        const botonEl = div.querySelector(".btn-ubicacion")
        botonEl?.addEventListener("click", () => {
            navigator.geolocation.getCurrentPosition((e) => {
                const lng = e.coords.longitude as any
                const lat = e.coords.latitude as any
                state.myLocation(lng, lat, () => {
                    Router.go("/lost-pets")
                })
            })
        })

    }
}
customElements.define("welcome-page", Welcome)