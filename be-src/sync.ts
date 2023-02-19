import { User } from "./models/users";
import { Auth } from "./models/auth";
import { Pet } from "./models/pets";

Pet.sequelize.sync({ alter: true }).then((res) => {
    console.log(res);
})
