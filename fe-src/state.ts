const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        user: {
            name: "",
            email: "",
            password: "",
            token: ""
        },
        myReports: [],
        lng: "",
        lat: "",
        algoliaData: [],
        loadPet: [],

    },
    listeners: [],

    initLocalStorage() {
        const lastLocalStorage = localStorage.getItem("data")
        if (!lastLocalStorage) {
            return;
        } else {
            const cs = this.getState()
            state.setState(JSON.parse(lastLocalStorage))
        }

    },

    init() {
        const cs = this.getState()
        const userOne = {
            ...cs,
            user: {
                name: "loyd",
                email: "loyd@gmail.com",
                password: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc3ODQ2MTgwfQ.sTIHMDAuaYLSyYazIIuP3gXuHmVaOTEzqoPt_ruUl7Q"
            }
        }

        localStorage.setItem("data", JSON.stringify(userOne))
    },

    getState() {
        const data = this.data
        return data
    },
    setState(newState) {
        this.data = newState
        for (const cb of this.listeners) {
            cb()
        }
        localStorage.setItem("data", JSON.stringify(newState))
        console.log("el state a cambiado", this.data);
    },
    myLocation(lng, lat, callback?) {
        const cs = state.getState()
        cs.lat = lat
        cs.lng = lng
        this.loadPets(() => {
            callback()
        })
    },

    async loadPets(callback?) {
        const cs = state.getState()
        await fetch(API_BASE_URL + "/close-to-me?lat=" + cs.lat + "&lng=" + cs.lng
        ).then(res => {
            return res.json();
        }).then(data => {
            cs.algoliaData = data
            this.setState(cs)
            if (callback) {
                callback()
            }
        })
    },

    async signUp(name, email, password, callback) {
        await fetch(API_BASE_URL + "/auth", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log("postgreSQL", data);
            if (data.error) {
                window.alert("el email ya esta registrado")
            }
            else {
                callback()
            }
        })
    },

    async signin(email, password, callback) {
        const cs = this.getState()
        await fetch(API_BASE_URL + "/auth/token", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, password })
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.message) {
                window.alert("datos incorrectos")

            }
            else {
                cs.user.name = data.user.name;
                cs.user.email = data.user.email;
                cs.user.password = data.auth.password
                cs.user.token = data.token
                this.setState(cs)
                callback()
            }
        })
    },

    async myReports(callback) {
        const cs = this.getState()
        const token = cs.user.token
        await fetch(API_BASE_URL + "/me/reports", {
            method: "get",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            cs.myReports = data
            state.setState(cs)
            callback()
        })
    },

    async newReport(name, imgUrl, place, lat, lng, callback?) {
        const cs = this.getState()
        const token = cs.user.token
        await fetch(API_BASE_URL + "/report", {
            method: "post",
            headers: {
                "content-type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({ name, imgUrl, place, lat, lng })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            callback()
        })
    },

    async findPet(id, callback?) {
        const cs = this.getState()
        const token = cs.user.token
        const pet = await fetch(API_BASE_URL + "/me/find-pet/" + id, {
            method: "get",
            headers: {
                "content-type": "application/json",
                "Authorization": "bearer " + token
            },
        }).then(res => {
            return res.json()
        }).then(data => {
            //   console.log(data);
            this.loadPet(data)
        })

        if (callback) {
            callback()

        }
    },

    loadPet(data) {
        const cs = this.getState()
        cs.loadPet = data
        this.setState(cs)
    },

    async editPet(id, data, callback?) {
        const cs = this.getState()
        const token = cs.user.token
        await fetch(API_BASE_URL + "/me/edit-pet/" + id, {
            method: "put",
            headers: {
                "content-type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data) {
                callback()
            }
        })
    },

    async deletePet(id, callback?) {
        const cs = this.getState()
        const token = cs.user.token
        await fetch(API_BASE_URL + "/me/delete-pet/" + id, {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "Authorization": "bearer " + token
            },
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            cs.loadPet = []
            this.setState(cs)
            callback()
        })

    },

    async editUser(body, callback?) {
        const cs = this.getState()
        const token = cs.user.token
        await fetch(API_BASE_URL + "/me/edit-user", {
            method: "put",
            headers: {
                "content-type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(body)
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.message) {
                cs.user.name = body.name
                cs.user.email = body.email
                this.setState(cs)
                callback()
            }
        })

    },



    suscribe(callback: (any) => any) {
        this.listeners.push(callback)
    },
}
export { state }