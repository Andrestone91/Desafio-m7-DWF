export class Welcome extends HTMLElement {
    connectedCallback() {
        this.render()
    }
    render() {
        const div = document.createElement("div")
        const style = document.createElement("style")
        const shadow = this.attachShadow({ mode: "open" })
        style.textContent = `
        
        `
        shadow.appendChild(style)
        div.innerHTML = `
        <h1>soy el front</h1>
        `
        shadow.appendChild(div)
    }
}
customElements.define("welcome-page", Welcome)