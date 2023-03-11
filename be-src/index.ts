import * as express from "express"
import * as path from "path"
import * as cors from "cors"
import { index } from "./lib/algolia"
import { User, Pet } from "./models"
import { findOrCreateUser, tk, authMiddleware, editUser } from "./controllers/users-controller"
import { createReport, editPet } from "./controllers/pest-controller"
//import { sequelize } from "./models/connec"
//sequelize.sync({ force: true })

const app = express()
const port = process.env.PORT || 3005

app.use(express.json({
    limit: "50mb"
}));

app.use(cors())


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

//editar usuario
app.put("/me/edit-user", authMiddleware, async (req, res) => {
    const id = req._user.id
    const user = await editUser(req.body, id)
    res.json({ message: "se actualizo: " + user + " registro/s" })
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
app.get("/me/find-pet/:id", async (req, res) => {
    const id = req.params.id
    const pet = await Pet.findByPk(id, { include: [User] })
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
    const pet = await editPet(req.body, id)

    res.json({ message: "se actualizo: " + pet + " registro/s" })
})

//borrar mascota
app.delete("/me/delete-pet/:id", authMiddleware, async (req, res) => {
    const id = req.params.id
    const objectID = `${id}`
    if (await Pet.findByPk(id)) {
        Pet.destroy({ where: { id: id } })
        await index.deleteObject(objectID)
        res.json({ message: "diste de baja la busqueda de la mascota" })
    } else {
        res.json({ message: "no se encuentra la mascota" })
    }
})
app.use(express.static("dist"));
app.get("*", (req, res) => {
    const ruta = path.resolve(__dirname, "../dist/index.html")
    res.sendFile(ruta)
})

app.listen(port, () => {
    console.log("corriendo el puerto:" + port);
})