import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import { index } from "./lib/algolia"
import { findOrCreateUser, tk } from "./controllers/users-controller"

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

//signup
app.post("/auth", async (req, res) => {
    const { name, email, password } = req.body;
    const findUser = await findOrCreateUser(name, email, password)
    if (findUser.message) {
        res.status(404).json({
            error: "el usuario ya existe"
        })
    } else {
        res.json(findUser)
    }

})
//signin
app.post("/auth/token", async (req, res) => {
    const { email, password } = req.body;
    const authToken = await tk(email, password)
    if (authToken.message) {
        res.status(404).json(authToken)
    }
    if (authToken.token) {
        res.status(200).json(authToken)
    }
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