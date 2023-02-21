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