const createService = (handler, enhancer) => {
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.');
        }
        return enhancer(createService)(handler);
    }
    return {
        consume: handler,
    };
};

module.exports = createService;