import { DataTypes, Model } from "sequelize"
import { sequelize } from "./connec"

export class Pet extends Model { }
Pet.init({
    name: DataTypes.STRING,
    place: DataTypes.STRING,
    imgUrl: DataTypes.STRING,

},
    {
        sequelize,
        modelName: "Pet"
    }
)