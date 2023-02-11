const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
        user: {
            name: "",
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
    suscribe(callback: (any) => any) {
        this.listeners.push(callback)
    },
}
export { state }