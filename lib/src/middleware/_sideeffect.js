const SideeffectMiddleware = next => payload => {
    const push = (sideaction) => {
        const sidepayload = Object.assign({},sideaction, {source:payload.uuid});
        console.log(sidepayload);
    }
    const result = next(Object.assign({}, payload, {push}))
    // Flush the pushs;
    return result;
};

module.exports = SideeffectMiddleware