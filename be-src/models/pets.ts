import { DataTypes, Model } from "sequelize"
import { sequelize } from "./connec"

export class Pet extends Model { }
Pet.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    place: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
},
    {
        sequelize,
        modelName: "Pet"
    }
)