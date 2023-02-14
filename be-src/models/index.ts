import { User } from "./users";
import { Auth } from "./auth";
import { Pet } from "./pets";

User.hasMany(Pet)
Pet.belongsTo(User)

export { User, Pet, Auth }