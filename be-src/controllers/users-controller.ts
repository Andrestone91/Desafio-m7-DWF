import { User, Pet, Auth } from "../models"
import * as crypto from "crypto"
import * as jwt from "jsonwebtoken"

const SECRET = "olaolaaloalo"
function getSHA256ofString(text: string) {
    return crypto.createHash('sha256').update(text).digest('hex')
}

export async function findOrCreateUser(name, email, password) {
    const [user, userCreated] = await User.findOrCreate({
        where: { email: email },
        defaults: {
            name
        }
    })
    const [auth, authCreated] = await Auth.findOrCreate({
        where: { user_id: user.get("id") },
        defaults: {
            email,
            password: getSHA256ofString(password),
        }
    })
    const created = { userCreated, authCreated }
    if (created.userCreated == false) {
        return { message: "el email ya esta registrado" }
    }
    if (created.userCreated) {
        return tk(email, password, created)
    }
}

export async function tk(email, password, created?) {
    const auth = await Auth.findOne({
        where: { email, password: getSHA256ofString(password) },
    })
    try {
        const token = jwt.sign({ id: auth.get("user_id") }, SECRET)
        if (auth) {
            const authGet = auth.get("user_id") as any
            const user = await User.findByPk(authGet)
            return { created, user, auth, token }
        }
    } catch {
        return { message: "email or password incorrect" }
    }
}