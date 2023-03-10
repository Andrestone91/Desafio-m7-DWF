import { Router } from "@vaadin/router"
import { state } from "../../state"

export class Login extends HTMLElement {
  connectedCallback() {

    this.render()
  }
  render() {
    const div = document.createElement("div")
    const style = document.createElement("style")

    style.textContent = `
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
        .login{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            height: 80vh;
        }
        .form{
            width:300px;
            height:300px;
            padding:30px;
          background-color:hsl(48, 100%, 96%);
          border-radius:30px;
          
        }
        .title{
          font-size:24px;
        }
        .hidden{
          display:none;
      }
        `
    this.appendChild(style)
    div.innerHTML = `
    <header-custom></header-custom>
    <div class="login">
    <h1 class="title">Ingresar</h1>
        <form class="form box">
        <div class="field">
          <label class="label is-white">Email</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="email" placeholder="ingresar email" name="email"/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <p class="control has-icons-left">
            <input class="input is-rounded" type="password" placeholder="Password" name="password"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
        <p class="control">
          <button class="button is-success is-fullwidth">
            Login
          </button>
        </p>
      </div>
      </form>
      <div class="hidden">
        <iframe
        src="https://giphy.com/embed/sSgvbe1m3n93G"
        width="50"
        height="50"
        frameborder="0"
        class="giphy-embed"
        allowfullscreen>
        </iframe>
        </div>
      <h2>no tienes una cuenta?</h2>
      <a class="link__crear-cuenta" >crear cuenta</a>
    </div>
        `

    //signin
    const form = div.querySelector(".form")
    const hidden = div.querySelector(".hidden") as any
    form?.addEventListener("submit", (e) => {
      e.preventDefault()
      if (hidden) {
        hidden.classList.remove("hidden")
      }
      const cs = state.getState();
      const target = e.target as any;
      const email = target.email.value;
      const password = target.password.value;
      if (!email || !password) {
        return hidden.classList.add("hidden"), window.alert("faltan datos")
      }
      state.signin(email, password, () => {
        if (cs.lng == "") {
          Router.go("/")
        }
        if (cs.lng !== "") {
          Router.go("/lost-pets")
        }
      })
    })

    //crear cuenta
    const crear = div.querySelector(".link__crear-cuenta")
    crear?.addEventListener("click", () => {
      Router.go("/create-user")
    })
    this.appendChild(div)
  }
}
customElements.define("login-page", Login)