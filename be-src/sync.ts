import { User } from "./models/users";
import { Auth } from "./models/auth";
Auth.sequelize.sync({ force: true }).then((res) => {
    console.log(res);
})