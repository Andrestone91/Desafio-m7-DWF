import { state } from "../../state"
import Dropzone from "dropzone";
import * as mapboxgl from "mapbox-gl";
import * as MapboxClient from "mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYW5kcmVzdG9uZTkxIiwiYSI6ImNsY3VzaDFycjFjcW8zb2s2bWttbWRkemoifQ.TECDGazzFa2PZDVPY9Ixyw";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

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
        .contenedor-principal {
            width: 80%;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
       
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
            width: 100%;
            display: flex;
            flex-direction: column;
        }
    
        `
        shadow.appendChild(style)


        div.innerHTML = `
     
        <header-custom></header-custom>
        <div class="contenedor-principal">
          <h1 class="title-welcome">Reportar mascota perdida</h1>
        
        <form class="form">
          <label>Nombre de la mascota</label>
             <input name="name" class="form__input" type="text" placeholder="Buki">
         <label>foto</label>
              <div class="profile-picture-container">
                  <img class="profile-picture" width="200" />
                  <h3 class="profile-picture-button">arrastra la foto aqui</h3>
               </div>
          <label>lugar</label>
              <input class="input-search" name="q" type="search" />
              <button name="place" class="search">Buscar</button>
              <button>subir</button>
          <div id="map" class="contenedor-map"></div>
        </form>
        </div>
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




        // const formEl = div.querySelector(".form")
        // formEl?.addEventListener("submit", (e) => {
        //     e.preventDefault()
        //     const target = e.target as any
        //     const name = target.name.value
        //     const place = target.place.value
        //     //  const lat = target.lat.value
        //     //  const lng = target.lng.value
        //     const imgUrl = imagenDataURL
        //     //     console.log(lat, lng);
        //     // state.newReport(name, imgUrl, place, lat, lng)
        // })
    }
}
customElements.define("report-pet", Report)