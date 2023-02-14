import { DataTypes, Model } from "sequelize"
import { sequelize } from "./connec"

export class User extends Model { }
User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
},
    {
        sequelize,
        modelName: "User"
    }
)