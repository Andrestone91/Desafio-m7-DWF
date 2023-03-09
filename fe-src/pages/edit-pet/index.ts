import { state } from "../../state"
import { Router } from "@vaadin/router"
import Dropzone from "dropzone";
import * as mapboxgl from "mapbox-gl";
import * as MapboxClient from "mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.MAPBOX_API_TOKEN
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);


export class Edit extends HTMLElement {
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
            width:350px;
            height:350px;
          }
          .hidden{
            display:none;
        }
        `
        this.appendChild(style)


        div.innerHTML = `
     
        <header-custom></header-custom>
        <div class="contenedor-principal">
          <h1 class="title-welcome">Editar mascota perdida</h1>
        
        <form class="form">
          <label>Nombre de la mascota</label>
             <input name="name" class="form__input" type="text" placeholder="Buki">
         <label>foto</label>
              <div class="profile-picture-container">
              <h3 class="profile-picture-button">arrastra la foto aqui</h3>
           <!--   <img class="profile-picture" width="120" height="120" /> --!>
               </div>
          <label>lugar</label>
          <input class="input-search" name="q" type="search" />
          <button name="place" class="search">Buscar</button>
          <div id="map" class="contenedor-map"></div>
          <button>Actualizar</button>
          </form>
          <button class="delete">borrar</button>
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
        const picture = div.querySelector(".profile-picture-container") as any

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
            const cs = state.getState()
            const data = cs.loadPet
            const mapId = div.querySelector("#map") as any
            mapboxgl.accessToken = MAPBOX_TOKEN;
            return new mapboxgl.Map({
                container: mapId,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [data.lng, data.lat],
                zoom: 14
            });

        }

        function initSearchForm(callback) {
            const imputSearchEl = div.querySelector(".input-search") as any
            const cs = state.getState()
            const data = cs.loadPet
            mapboxClient.geocodeForward(
                imputSearchEl.value = data.place,
                {
                    country: "ar",
                    autocomplete: true,
                    language: "es",
                },
                function (err, data, res) {
                    //   console.log(data);
                    if (!err) callback(data.features);
                }
            );
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
                        //   console.log(data);
                        if (!err) callback(data.features);
                    }
                );
            });
        }

        function pullPet() {
            const cs = state.getState()
            const data = cs.loadPet
            const formEl = div.querySelector(".form") as any
            const picture = div.querySelector(".profile-picture") as any
            formEl.name.value = data.name
            //    picture.src = data.imgUrl
            formEl.q.value = data.place

        }
        async function mapboxDisplay() {
            pullPet()
            const cs = state.getState()
            const data = cs.loadPet
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
                    if (!name || imgUrl == undefined || !place) {
                        return hidden.classList.add("hidden"), window.alert("se necesitan todos los datos")
                    } else {
                        const mod = {
                            name,
                            imgUrl,
                            place,
                            lat,
                            lng
                        }
                        state.editPet(data.id, mod, () => {
                            window.alert("se actualizaron los datos")
                            state.myReports(() => {
                                hidden.classList.add("hidden")
                                Router.go("/my-reports")
                            })
                        })

                    }

                })
                const borrarEl = div.querySelector(".delete")
                borrarEl?.addEventListener("click", (e) => {
                    e.preventDefault()
                    // console.log(cs.myReports["name"]);

                    state.deletePet(data.id, () => {
                        window.alert("la mascota fue removido")
                        state.myReports(() => {
                            Router.go("/my-reports")
                        })

                    })

                })

                map.setCenter(firstResult.geometry.coordinates);
                map.setZoom(14);
            });
        }
        mapboxDisplay()
    }
}
customElements.define("edit-pet", Edit)