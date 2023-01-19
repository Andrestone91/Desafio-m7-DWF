import * as express from "express"
import * as path from "path"

const app = express()
const port = 3000

app.use(express.json({
    limit: "50mb"
}));

app.get("/test", (req, res) => {
    res.json({ funciona: "ok" })
})
app.get("*", (req, res) => {
    const ruta = path.resolve(__dirname, "../fe-dist/index.html")
    res.sendFile(ruta)
})

app.listen(port, () => {
    console.log("corriendo el puerto:" + port);
})