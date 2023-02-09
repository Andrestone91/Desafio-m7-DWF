import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import { index } from "./lib/algolia"

const app = express()
const port = 3000

app.use(express.json({
    limit: "50mb"
}));

app.use(cors())

app.get("/test", async (req, res) => {
    await index.saveObject({
        objectID: 1000,
        name: "mascota 1",
        location: "Quilmes Oeste",
        imgUrl: "1234",
        _geoloc: {
            lat: -34.743690,
            lng: -58.306064
        }
    }).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })
    res.json({ funciona: "ok" })
})

app.get("/close-to-me", async (req, res) => {
    const { lat, lng } = req.query
    const { hits }: any = await index.search("", {
        aroundLatLng: [lat, lng].join(","),
        aroundRadius: 5000
    })
    res.json(hits)
})

app.get("*", (req, res) => {
    const ruta = path.resolve(__dirname, "../fe-dist/index.html")
    res.sendFile(ruta)
})

app.listen(port, () => {
    console.log("corriendo el puerto:" + port);
})