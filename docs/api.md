# Api
## Messages

### Command
Describe the Intent
### Event
Describe what Happened

## Handler
Handlers are simple functions that take the Message

### Simple Handler
```javascript
const message = {
    type: 'ORDER.CREATE_ORDER',
    customer: 12,
    item: 3
}
const CreateOrderHandler = function(message) {
    // Context is provided by middleware
    const customer = this.getContext('customer');
    const item = this.getContext('item');
    const order = {
        customer,
        item,
        price: item.price * customer.discount
    }
    // Just return the result, middleware will take care of saving
    return order;
}
```

### Dispathing additional actions
```javascript
const message = {
    type: 'ORDER.CREATE_ORDER',
    customer: 12,
    item: 3
}

const CreateOrderHandler = function(message) {
    /* .... */
    const invoice = {
        customer,
        item,
    }
    const createInvoiceCommand = {
        type: 'INVOICE.CREATE_INVOICE',
        data: invoice
    }
    this.apply(createInvoiceCommand);
}
```


## Middleware

### 

## Saga