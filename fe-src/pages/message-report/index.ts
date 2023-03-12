import { Router } from "@vaadin/router"
import { state } from "../../state"

export class Message extends HTMLElement {
  connectedCallback() {
    this.render()
  }
  render() {
    const cs = state.getState()
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
          .form{
            display:flex;
            flex-direction:column;
          }
          .title-welcome {
            font-size: 40px;
            font-family: "Poppins", sans-serif;
          }
      .input{
        width:350px;
        margin-bottom: 25px;
        padding:5px;
        font-size: 15px;
        }
        .textarea{
            height:200px;
            padding:5px;
            font-size: 17px;
        }
        .btn{
          background: #5bff005c;
    padding: 10px;
    border: none;
        }
        `
    this.appendChild(style)

    const email = cs.loadPet.User.email

    div.innerHTML = `
        <header-custom></header-custom>
        <div class="contenedor-principal">
        <h1 class="title-welcome">Reportar info de ${cs.loadPet.name}</h1>

        <form class="form" action="https://formsubmit.co/${email}" method="POST">
        <label>NOMBRE</label>
        <input  type="text"name="nombre" class="input" required>
        <label>TELEFONO</label>
        <input type="number" name="telefono" class="input" required>
        <label>¿DÓNDE LO VISTE?</label>
        <textarea type="text" name="mensaje" class="input textarea" cols="30" rows="10" required></textarea>
        
        <input type="hidden" name="_next" value="https://mascotas-perdidas.onrender.com/">
        <input type="hidden" name="_subject" value="Novedades de su mascota">
        <input type="hidden" name="_captcha" value="false">
        <button  class="btn"type="submit">Enviar</button>
        </form>
        </div>
        `
    this.appendChild(div)

  }
}
customElements.define("message-page", Message)