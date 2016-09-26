import test from "ava";
import expect from "unexpected";
import makeOrderBF from "./utils";

/*
    test('service:order:core:createOrder', t => {
        const OrderCore = makeOrderBF();
        const target = {};
        const action = {
            type: 'CREATE_ORDER',
            customer: 15,
            items: [
                {id: 1, quantity: 2},
                {id: 3, quantity: 1}
            ]
        };


        const finalTarget = OrderCore.handle({target, action});


        expect(finalTarget, 'to only have keys', ['customer', 'items'])
            .and('to satisfy', {
                customer: action.customer,
                items: expect.it('to have length', 2)
            })
    });
*/