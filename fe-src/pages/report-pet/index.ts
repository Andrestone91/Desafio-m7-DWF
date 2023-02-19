import { state } from "../../state"

export class Report extends HTMLElement {
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
        <h1 class="title-welcome">Reportar mascota perdida</h1>
      
        `

        shadow.appendChild(div)
    }
}
customElements.define("report-pet", Report)