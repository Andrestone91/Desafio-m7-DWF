import { Router } from "@vaadin/router"
import { state } from "../../state"

export class EditUser extends HTMLElement {
  connectedCallback() {
    this.render()
  }
  render() {
    const div = document.createElement("div")
    const style = document.createElement("style")

    style.textContent = `
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
        .formCreate{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            height: 90vh;
        }
        .form{
            width:300px;
      
            padding:30px;
          background-color:hsl(48, 100%, 96%);
          border-radius:30px;
          
        }
      .title{
        font-size:24px;
      }
      .button-cancelar{
        margin-top:10px;
      }
        `
    this.appendChild(style)
    div.innerHTML = `
    <header-custom></header-custom>
    <div class="formCreate">
    <h1 class="title">Editar Datos</h1>
        <form class="form box">
        <div class="field">
          <label class="label is-white">Nombre</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="text" placeholder="Nuevo nombre" name="nombre"/>
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label is-white">Email</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="email" placeholder="Cambiar email" name="email"/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>

        <div class="field">
        <p class="control">
          <button class="button is-success is-fullwidth">
            Guardar
          </button>
          <button class="button button-cancelar is-success is-fullwidth">
            Volver
          </button>
          </p>
          </div>
          </form>
   
    </div>
        `

    const form = div.querySelector(".form") as any
    function pullUser() {
      const cs = state.getState()
      form.nombre.value = cs.user.name
      form.email.value = cs.user.email
    }

    pullUser()
    form?.addEventListener("submit", (e) => {
      e.preventDefault()

      const target = e.target as any;
      const nombre = target.nombre.value;
      const email = target.email.value;


      if (!email || !nombre) {
        return window.alert("se necesitan todos los datos")
      }
      else if (nombre && email) {

        const data = {
          name: nombre,
          email: email

        }
        state.editUser(data, () => {
          window.alert("los datos fueron actualizados")
        })



      }
    })
    const btnC = div.querySelector(".button-cancelar")
    btnC?.addEventListener("click", (e) => {
      e.preventDefault()
      Router.go("/my-user")

    })

    this.appendChild(div)
  }
}
customElements.define("edit-user", EditUser)