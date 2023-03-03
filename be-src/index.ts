import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import { index } from "./lib/algolia"
import { User, Pet } from "./models"
import { findOrCreateUser, tk, authMiddleware } from "./controllers/users-controller"
import { createReport, bodyToIndex, editPet } from "./controllers/pest-controller"
//import { sequelize } from "./models/connec"
//sequelize.sync({ force: true })

const app = express()
const port = 3000

app.use(express.json({
    limit: "50mb"
}));

app.use(cors())

//test
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

//mascotas cerca
app.get("/close-to-me", async (req, res) => {
    const { lat, lng } = req.query
    const { hits }: any = await index.search("", {
        aroundLatLng: [lat, lng].join(","),
        aroundRadius: 5000
    })
    res.json(hits)
})

//yo
app.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findByPk(req._user.id)
    res.json(user)
})

//encontrar una mascota
app.get("/me/find-pet/:id", authMiddleware, async (req, res) => {
    const id = req.params.id
    const pet = await Pet.findByPk(id)
    res.json(pet)
})

//mis reportes
app.get("/me/reports", authMiddleware, async (req, res) => {
    const pets = await Pet.findAll({
        where: { UserId: req._user.id },
        include: [User]
    })
    res.json(pets)
})

//reporta mascotas
app.post("/report", authMiddleware, async (req, res) => {
    const { name, imgUrl, place, lat, lng } = req.body
    const pet = await createReport(name, imgUrl, place, lat, lng, req._user.id)
    res.json(pet)
})

//editar mascota
app.put("/me/edit-pet/:id", authMiddleware, async (req, res) => {
    const id = req.params.id
    const pet = await Pet.update(editPet(req.body, id), {
        where: {
            id: id
        }
    })

    res.json({ message: "se actualizo: " + pet + " registro/s" })
})

app.get("*", (req, res) => {
    const ruta = path.resolve(__dirname, "../fe-dist/index.html")
    res.sendFile(ruta)
})

app.listen(port, () => {
    console.log("corriendo el puerto:" + port);
})