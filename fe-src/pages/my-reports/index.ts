import { state } from "../../state"

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
        .title-welcome{
            font-size:40px;
        }
        .container{
            width:365px;
            height:200px;
            border:solid 2px;
            margin:auto;
        }
        .separar{
            display:flex;
            justify-content: space-around;
            align-items: center;
        }
        `
        shadow.appendChild(style)




        div.innerHTML = `
        <header-custom></header-custom>
        <h1 class="title-welcome">Mis mascotas reportadas</h1>
        
        
        <div>
        ${cs.myReports.map(data =>
            `<div class="container">
                <div class="container__img">
                     ${data.imgUrl}
                 </div>
              <div class="separar">
                  <div class="container__info">
                     <h2>${data.name}</h2>
                      <h2>${data.place}</h2>
                  </div>
                 <div class="container__report"
                     <h2>reportar mascota</h2>
                  </div>
              </div>
            </div>`
        )}
        </div>
        `
        shadow.appendChild(div)

    }
}
customElements.define("myreport-page", MyReports)