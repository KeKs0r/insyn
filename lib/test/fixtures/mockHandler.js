const mockHandler = payload => Object.assign({}, payload, { mockLU: true });

module.exports = mockHandler;