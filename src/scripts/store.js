class Store {
    constructor() {
        this.objects = [];
    }

    set(storeKey, data) {
        this.objects[storeKey] = data;
    }

    get(storeKey) {
        return this.objects[storeKey];
    }
}

let store = new Store();