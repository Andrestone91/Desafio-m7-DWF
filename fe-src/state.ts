const state = {
    data: {
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
        await fetch("http://localhost:3000/close-to-me?lat=" + cs.lat + "&lng=" + cs.lng
        ).then(res => {
            return res.json();
        }).then(data => {
            cs.algoliaData = data
            console.log(data);
            callback()
        })
    },
}
export { state }