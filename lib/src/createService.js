const createService = function (logicUnit, enhancer) {
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        return enhancer(createService)(logicUnit);
    }
    return logicUnit;
};

module.exports = createService;