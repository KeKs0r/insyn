class MemoryStore {
    constructor(fixtures, name) {
        this.data = fixtures || {};
        this.name = name;
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        return value;
    }

    getAll() {
        return this.data;
    }
}

module.exports = MemoryStore;