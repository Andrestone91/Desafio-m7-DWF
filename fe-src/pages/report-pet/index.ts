import { state } from "../../state"
import { Router } from "@vaadin/router"
import Dropzone from "dropzone";
import * as mapboxgl from "mapbox-gl";
import * as MapboxClient from "mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.MAPBOX_API_TOKEN
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);


export class Report extends HTMLElement {
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
       
          .title-welcome {
            font-size: 40px;
            font-family: "Poppins", sans-serif;
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
        /*.profile-picture-button{
            border:solid 2px;
            width: 200px;
            height: 200px;
            margin:auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }*/
        .contenedor-map{
            height:350px;
          }
          .hidden{
            display:none;
        }
        .form__input,.input-search{
            margin-bottom: 25px;
            padding: 5px;
            font-size: 15px;
        }
        .search,.btn-upload{
            background: #5bff005c;
            padding: 10px;
            border: none;
            margin: 20px 0;
        }
        `
        this.appendChild(style)


        div.innerHTML = `
     
        <header-custom></header-custom>
        <div class="contenedor-principal">
          <h1 class="title-welcome">Reportar mascota perdida</h1>
        
        <form class="form">
          <label>NOMBRE DE LA MASCOTA</label>
             <input name="name" class="form__input" type="text" placeholder="Perrito malvado">
         <label>FOTO</label>
              <div class="profile-picture-container">
               
                  <h3 class="profile-picture-button">arrastra la foto aqui</h3>
               </div>
          <label>LUGAR</label>
          <input class="input-search" name="q" type="search" placeholder="Quilmes" />
          <button name="place" class="search">Buscar</button>
          <div id="map" class="contenedor-map"></div>
          <button class="btn-upload">subir</button>
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
        </div>
        `

        this.appendChild(div)
        const picture = div.querySelector(".profile-picture-container")

        var imagenDataURL
        const myDropzone = new Dropzone(picture, {
            url: "/false",
            autoProcessQueue: false,
        })
        myDropzone.on("thumbnail", function (file) {
            imagenDataURL = file.dataURL
            document.querySelector(".dz-error-mark")?.remove();
            document.querySelector(".dz-success-mark")?.remove();
            document.querySelector(".dz-error-message")?.remove();
            document.querySelector(".dz-progress")?.remove();
            document.querySelector(".dz-details")?.remove();
        });

        function initMap() {
            let lng = cs.lng
            let lat = cs.lat
            mapboxgl.accessToken = MAPBOX_TOKEN;
            const mapId = div.querySelector("#map") as any
            return new mapboxgl.Map({
                container: mapId,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lng, lat],
                zoom: 14
            });
        }

        function initSearchForm(callback) {
            const imputSearchEl = div.querySelector(".input-search") as any
            const searchEl = div.querySelector(".search") as any;
            searchEl?.addEventListener("click", (e) => {
                e.preventDefault()

                mapboxClient.geocodeForward(
                    imputSearchEl.value,
                    {
                        country: "ar",
                        autocomplete: true,
                        language: "es",
                    },
                    function (err, data, res) {
                        console.log(data);
                        if (!err) callback(data.features);
                    }
                );
            });
        }
        async function mapboxDisplay() {

            let map = initMap();
            initSearchForm(function (results) {
                const firstResult = results[0];
                const marker = new mapboxgl.Marker()
                    .setLngLat(firstResult.geometry.coordinates)
                    .addTo(map);
                const [lng, lat]: any = firstResult.geometry.coordinates

                const formEl = div.querySelector(".form")
                const hidden = div.querySelector(".hidden") as any
                formEl?.addEventListener("submit", (e) => {
                    e.preventDefault()
                    if (hidden) {
                        hidden.classList.remove("hidden")
                    }
                    const target = e.target as any
                    const name = target.name.value
                    const imgUrl = imagenDataURL
                    const place = target.q.value
                    //  console.log(name, imgUrl, place, lat, lng);
                    if (!name || imgUrl == undefined || !place) {
                        return hidden.classList.add("hidden"), window.alert("se necesitan todos los datos")
                    } else {
                        state.newReport(name, imgUrl, place, lat, lng, () => {
                            window.alert("la mascota fue publicada")
                            state.myReports(() => {
                                hidden.classList.add("hidden")
                                Router.go("/my-reports")
                            })
                        })
                    }
                })


                map.setCenter(firstResult.geometry.coordinates);
                map.setZoom(14);
            });
        }
        mapboxDisplay()
    }
}
customElements.define("report-pet", Report)