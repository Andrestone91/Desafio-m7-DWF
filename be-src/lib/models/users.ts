import { DataTypes, Model } from "sequelize"
import { sequelize } from "./connec"

export class User extends Model { }
User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
},
    {
        sequelize,
        modelName: "User"
    }
)