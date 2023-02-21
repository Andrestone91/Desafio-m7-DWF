import { state } from "../../state"
import Dropzone from "dropzone";


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
        .form{
            width: 80%;
            margin: auto;
            display: flex;
            flex-direction: column;
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
        
        <form class="form">
          <label>Nombre de la mascota</label>
             <input name="name" class="" type="text" placeholder="Buki">
         <label>foto</label>
              <div class="profile-picture-container">
                  <img class="profile-picture" width="200" />
                  <h3 class="profile-picture-button">arrastra la foto aqui</h3>
               </div>
          <label>lugar</label>
              <input name="place" class="" type="text" placeholder="Quilmes">
          <label>lat</label>
              <input name="lat" class="" type="text" placeholder="-34.x">
          <label>lng</label>
              <input name="lng" class="" type="text" placeholder="-58.x">
           <button>enviar</button>
        </form>
        `

        shadow.appendChild(div)
        const picture = div.querySelector(".profile-picture-container")

        let imagenDataURL
        const myDropzone = new Dropzone(picture, {
            url: "/false",
            autoProcessQueue: false,
        })
        myDropzone.on("thumbnail", function (file) {
            imagenDataURL = file.dataURL
        });

        const formEl = div.querySelector(".form")
        formEl?.addEventListener("submit", (e) => {
            e.preventDefault()
            const target = e.target as any
            const name = target.name.value
            const place = target.place.value
            const lat = target.lat.value
            const lng = target.lng.value
            const imgUrl = imagenDataURL
            //console.log(name, imgUrl, place, lat, lng);
            state.newReport(name, imgUrl, place, lat, lng)
        })
    }
}
customElements.define("report-pet", Report)