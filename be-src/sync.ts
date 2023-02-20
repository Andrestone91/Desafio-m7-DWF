import { User } from "./models/users";
import { Auth } from "./models/auth";
import { Pet } from "./models/pets";
import { sequelize } from "./models/connec"
//sequelize.sync({ force: true })
Auth.sequelize.sync({ force: true }).then((res) => {
    console.log(res);
})
