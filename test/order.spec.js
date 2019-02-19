let chai = require('chai');
let rewire = require('rewire');
let order = rewire('../lib/order');

describe('order', function() {
    beforeEach(function() {
        const testdata = [
            {
                sku: 'P',
                qty: 9
            }
        ];
        order.__set__('inventoryData', testdata);
    });
    
    it('order a product', function(done) {
        order.orderItem('P', 9, function() {
            done();
        });
    });
});
