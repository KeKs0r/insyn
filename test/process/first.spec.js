const test = require('ava');
const expect = require('unexpected');
const _ = require('lodash');


const TestApp = require('../util/TestApp');
const { app, orderStore, invoiceStore } = TestApp;
const { ACTIONS, STATUS } = require('../../src/constants');


const process = require('../fixtures/first');

test.serial.cb('1. createOrder: Order + Invoice are created', t => {
  app.handle(process[ACTIONS.ORDER.CREATE_ORDER]);

  expect(_.size(orderStore.getAll()), 'to be', 1);
  const order = _.head(_.values(orderStore.getAll()));
  expect(order, 'to satisfy', {
    status: STATUS.ORDER.OPEN,
  });

  setTimeout(() => {
    expect(_.size(invoiceStore.getAll()), 'to be', 1);
    const invoice = _.head(_.values(invoiceStore.getAll()));
    expect(invoice, 'to satisfy', {
      status: STATUS.INVOICE.OPEN,
    });
    t.end();
  }, 10);

});

test.serial('2. confirm Order', t => {
  const orderId = _.get(_.head(_.values(orderStore.getAll())), 'id');
  const actionGenerator = process[ACTIONS.ORDER.CONFIRM_ORDER];
  const action = actionGenerator(orderId);
  app.handle(action);

  expect(_.size(orderStore.getAll()), 'to be', 1);
  const order = _.head(_.values(orderStore.getAll()));
  expect(order, 'to satisfy', {
    status: STATUS.ORDER.CONFIRMED,
  });
});


test.serial('3. Pay Invoice fully', t => {
  const invoiceId = _.get(_.head(_.values(invoiceStore.getAll())), 'id');
  const actionGenerator = process[ACTIONS.INVOICE.PAY_INVOICE];
  const action = actionGenerator(invoiceId);
  app.handle(action);

  expect(_.size(invoiceStore.getAll()), 'to be', 1);
  const invoice = _.head(_.values(invoiceStore.getAll()));
  expect(invoice, 'to satisfy', {
    status: STATUS.INVOICE.FULLY_PAID,
  });


});