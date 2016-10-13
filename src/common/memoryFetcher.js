const makeMemoryFetcher = fixtures => {
    const data = fixtures;
    return id => data[id];
};

module.exports = makeMemoryFetcher;