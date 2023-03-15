import { Router } from "@vaadin/router"
import { state } from "../../state"

export class EditPUser extends HTMLElement {
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
    <h1 class="title">Editar Contraseña</h1>
        <form class="form box">
        
       <div class="field">
        <label class="label">Nueva Contraseña</label>
        <p class="control has-icons-left">
          <input class="input is-rounded" type="password" placeholder="Nueva Contraseña" name="password"/>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        </div>

        <div class="field">
          <label class="label">Repetir Contraseña</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="password" placeholder="Repite la contraseña" name="repeatPassword"/>
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
          <button class="button button-cancelar is-success is-fullwidth">
           Volver
          </button>
          </p>
          </div>
          </form>
   
    </div>
        `

        const form = div.querySelector(".form") as any



        form?.addEventListener("submit", (e) => {
            e.preventDefault()
            const target = e.target as any;

            const password = target.password.value
            const repeatPassword = target.repeatPassword.value
            if (password !== repeatPassword) {
                return window.alert("la contraseña tiene que coincidir")
            }
            if (!password || !repeatPassword) {
                return window.alert("se necesitan todos los datos")
            }
            else if (password && repeatPassword) {

                if (password == repeatPassword) {

                    const data = {
                        password: password
                    }
                    state.editUser(data, () => {
                        window.alert("los datos fueron actualizados")
                    })


                }
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
customElements.define("edit-password-user", EditPUser)