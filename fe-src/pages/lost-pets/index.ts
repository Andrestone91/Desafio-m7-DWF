import { Router } from "@vaadin/router"
import { state } from "../../state"

export class LostPets extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const cs = state.getState()
        const div = document.createElement("div")
        const style = document.createElement("style")
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
        .contenedor-principal {
            width: 80%;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .title-welcome {
            font-size: 40px;
            font-family: "Poppins", sans-serif;
          }
        .img-pets{
            width: 100%;
            object-fit: cover;
            height: 100%;
        }
        .container__img{
            height: 143px;
        }
        .container{
            width:365px;
            height:250px;
            border:solid 2px;
            margin:auto;
        }
        .separar{
            display:flex;
            justify-content: space-around;
            align-items: center;
        }
        .container__info{
            font-family: 'Poppins', sans-serif;
        }
        .text-info{
            margin:10px;
        }
        .btn{
            background: #5bff005c;
            padding: 10px;
            border: none;
        }
        `
        shadow.appendChild(style)

        function noData() {
            if (cs.algoliaData == "") {
                return `<p>no hay datos</p>`
            } else if (cs.algoliaData !== "") {
                return "";
            }
        }

        div.innerHTML = `
        <header-custom></header-custom>
        <div class="contenedor-principal">
        <h1 class="title-welcome">Mascotas perdidas cerca tuyo</h1>
        <div>
        <h1>${noData()}</h1>
        ${cs.algoliaData.map(data =>
            `<div class="container">
                <div class="container__img">
                <img class="img-pets"src= ${data.imgUrl}>
                 </div>
              <div class="separar">
                  <div class="container__info">
                     <h2 class="text-info">${data.name}</h2>
                      <h2 class="text-info">${data.place}</h2>
                  </div>
                 <div class="container__report">
                 <button class="${"btn-edit-" + data.objectID} btn">Reportar mascota</button>
                  </div>
              </div>
            </div>`
        )}
        </div>
        </div>
        `
        cs.algoliaData.map(data => {
            const classBtnEl = ".btn-edit-" + data.objectID
            const botonEl = div.querySelector(classBtnEl)
            botonEl?.addEventListener("click", () => {
                state.findPet(data.objectID, () => {
                    Router.go("/message")
                })

            })
        })
        shadow.appendChild(div)
    }
}
customElements.define("lost-page", LostPets)