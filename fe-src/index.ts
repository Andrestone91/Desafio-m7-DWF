import * as dotenv from "dotenv"
dotenv.config()
import "./pages/welcome"
import "./pages/login"
import "./pages/create-user"
import "./pages/edit-user"
import "./pages/my-data"
import "./pages/lost-pets"
import "./pages/my-reports"
import "./pages/report-pet"
import "./pages/message-report"
import "./pages/edit-pet"
import "./pages/test-page"

import "./components/header"
import "../be-src/router"

import { state } from "./state"
function main() {
    // state.init()
    // state.initLocalStorage()
}
main()