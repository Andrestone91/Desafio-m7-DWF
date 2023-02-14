const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        user: {
            name: "",
            email: "",
            password: "",
        },
        lng: "",
        lat: "",
        algoliaData: []
    },
    listeners: [],
    getState() {
        const data = this.data
        return data
    },
    setState(newState) {
        this.data = newState
        for (const cb of this.listeners) {
            cb()
        }
        console.log("el state a cambiado", this.data);
    },
    myLocation(lng, lat, callback?) {
        const cs = state.getState()
        cs.lat = lat
        cs.lng = lng
        this.setState(cs)
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
            console.log(data);
            callback()
        })
    },

    async singUp(name, email, password, callback) {
        const cs = this.getState()

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
            if (data.userCreated == false) {
                window.alert("el email ya esta registrado")
            } else {
                cs.user.name = data.user.name
                cs.user.email = data.user.email
                cs.user.password = data.auth.password
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