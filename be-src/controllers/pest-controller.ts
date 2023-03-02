import { Pet } from "../models";
import { index } from "../lib/algolia"
import { cloudinary } from "../lib/cloudinary";

export async function createReport(name, imgUrl, place, lat, lng, userId) {
    if (!name || !imgUrl || !place || !lat || !lng) {
        throw "los datos son necesarios"
    } else {
        const resImage = await cloudinary.uploader.upload(imgUrl, {
            discard_original_filename: true,
            resource_type: "image",
            width: 1000,
        })
        const [pet, petCreated] = await Pet.findOrCreate({
            where: { imgUrl: resImage.secure_url },
            defaults: {
                name,
                place,
                lat,
                lng,
                UserId: userId
            }
        })
        if (petCreated) {
            await index.saveObject({
                objectID: pet.get("id"),
                name: pet.get("name"),
                place: pet.get("place"),
                imgUrl: pet.get("imgUrl"),
                _geoloc: {
                    lat: pet.get("lat"),
                    lng: pet.get("lng")
                }
            }).then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
        }
        return { petCreated, pet }
    }
}
export function bodyToIndex(body, id?) {
    const respuesta: any = {}
    if (body.name) {
        respuesta.name = body.name
    }
    if (body.imgUrl) {
        respuesta.imgUrl = body.imgUrl
    }
    if (body.place) {
        respuesta.place = body.place
    }
    if (body.lat && body.lng) {
        respuesta._geoloc = {
            lat: body.lat,
            lng: body.lng
        }
    }
    if (id) {
        respuesta.objectID = id
    }
    return respuesta
}