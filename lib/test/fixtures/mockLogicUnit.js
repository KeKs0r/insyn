const mockLU = function (payload) {
    return Object.assign({}, payload, {mockLU: true});
};


module.exports = mockLU;