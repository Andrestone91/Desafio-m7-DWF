import { state } from "../../state"
import { Router } from "@vaadin/router"

export class MyReports extends HTMLElement {
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
        .title-welcome{
            font-size:40px;
        }
        .container{
            width:365px;
            height:250px;
            border:solid 2px;
            margin:auto;
        }
        .container__img{
            height: 143px;
        }
        .img-pets{
            width: 100%;
            object-fit: cover;
            height: 100%;
          
        }
        
        .separar{
            display:flex;
            justify-content: space-around;
            align-items: center;
        }
        `
        shadow.appendChild(style)

        function noData() {
            if (cs.myReports == "") {
                return `<p>no hay datos</p>`
            } else if (cs.myReports !== "") {
                return "";
            }
        }

        div.innerHTML = `
        <header-custom></header-custom>
        <div class="contenedor-principal">
        <h1 class="title-welcome">Mis mascotas reportadas</h1>
        <h1>${noData()}</h1>
        
        <div>
        ${cs.myReports.map(data =>
            `<div class="container">
                <div class="container__img">
                    <img class="img-pets"src= ${data.imgUrl}>
                 </div>
              <div class="separar">
                  <div class="container__info">
                     <h2>${data.name}</h2>
                      <h2>${data.place}</h2>
                  </div>
                 <div class="container__report">
                     <button class="${"btn-edit-" + data.id}">Editar</button>
                  </div>
              </div>
            </div>`
        )}
        </div>
        </div>
        `

        shadow.appendChild(div)
        cs.myReports.map(data => {
            const pet = ".btn-edit-" + data.id
            const botonEditEl = div.querySelector(pet)
            botonEditEl?.addEventListener("click", () => {
                state.findPet(data.id, () => {
                    Router.go("/edit")
                })

            })
        })
    }
}
customElements.define("myreport-page", MyReports)