import { Pet } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function createReport(name, place, imgUrl, userId) {
    if (!name || !place || !imgUrl) {
        throw "los datos son necesarios"
    } else {
        //  const resImage = await cloudinary.uploader.upload(imgUrl, {
        //      discard_original_filename: true,
        //      resource_type: "image",
        //      width: 1000,
        //  })
        const [pet, petCreated] = await Pet.findOrCreate({
            where: { imgUrl: imgUrl },
            defaults: {
                name,
                place,
                UserId: userId
            }
        })
        return { petCreated, pet }
    }
}