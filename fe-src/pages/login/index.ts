export class Welcome extends HTMLElement {
  connectedCallback() {
    this.render()
  }
  render() {
    const div = document.createElement("div")
    const style = document.createElement("style")

    style.textContent = `
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
        .contenedor{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            height: 100vh;
        }
        .form{
            width:300px;
            height:300px;
            padding:30px;
          background-color:hsl(48, 100%, 96%);
          border-radius:30px;
          
        }
      
        `
    this.appendChild(style)
    div.innerHTML = `
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
          <label class="label">contraseña</label>
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
    
        `
    this.classList.add("contenedor")

    const form = div.querySelector(".form")
    form?.addEventListener("submit", (e) => {
      e.preventDefault()
      const target = e.target as any;
      const email = target.email.value;
      const password = target.password.value
      console.log(email, password);
    })

    this.appendChild(div)
  }
}
customElements.define("login-page", Welcome)