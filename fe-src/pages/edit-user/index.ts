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
            height:500px;
            padding:30px;
          background-color:hsl(48, 100%, 96%);
          border-radius:30px;
          
        }
      .title{
        font-size:24px;
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
            <input class="input is-rounded" type="text" placeholder="tu nombre" name="nombre"/>
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label is-white">Email</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="email" placeholder="ingresa un email" name="email"/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>

      <!-- 
       <div class="field">
        <label class="label">Contraseña Actual</label>
        <p class="control has-icons-left">
          <input class="input is-rounded" type="password" placeholder="actual" name="password"/>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        </div>
-->

        <div class="field">
          <label class="label">Nueva Contraseña</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="password" placeholder="nueva" name="password"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
          <label class="label">Repetir Contraseña</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="password" placeholder="Repite la nueva" name="repeatPassword"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
        <p class="control">
          <button class="button is-success is-fullwidth">
            Guardar
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
    // const form = div.querySelector(".form")
    form?.addEventListener("submit", (e) => {
      e.preventDefault()
      const cs = state.getState()
      const target = e.target as any;
      const nombre = target.nombre.value;
      const email = target.email.value;
      const password = target.password.value
      const repeatPassword = target.repeatPassword.value
      if (password !== repeatPassword) {
        window.alert("la contraseña tiene que coincidir")
      }
      if (password == repeatPassword) {
        const data = {
          name: nombre,
          email: email,
          password: password
        }
        state.editUser(data, () => {
          window.alert("los datos fueron actualizados")
        })

      }
    })

    this.appendChild(div)
  }
}
customElements.define("edit-user", EditUser)