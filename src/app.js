const createOrderService = require('./order');
const { EventEmitter } = require('events');

const init = () => {
    const em = new EventEmitter();
    createOrderService(em);
};
module.exports = init;