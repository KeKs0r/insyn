let data = {};

const createMemoryStore = fixtures => {
    if (fixtures) {
        data = fixtures;
    }
    return {
        get: key => data[key],
        set: (key, input) => {
            data[key] = input;
            return input;
        },
    };
};

module.exports = createMemoryStore;