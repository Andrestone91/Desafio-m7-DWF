import { User, Pet, Auth } from "../models"

import * as crypto from "crypto"

function getSHA256ofString(text: string) {
    return crypto.createHash('sha256').update(text).digest('hex')
}

export async function findOrCreateUser(name, email, password) {
    const [user, created] = await User.findOrCreate({
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
    return { authCreated, auth }
}

