const chai = require('chai');
const rewire = require('rewire');
const order = rewire('../lib/order');
const sinon = require('sinon');

describe('order', function() {
    beforeEach(function() {
        const testdata = [
            {
                sku: 'P',
                qty: 9
            }
        ];
        this.console = {
            log: sinon.spy()
        };
        order.__set__('inventoryData', testdata);
        order.__set__('console', this.console);
    });
    
    it('order a product', function(done) {
        let _this = this;
        order.orderItem('P', 9, function() {
            chai.expect(_this.console.log.callCount).to.be.equal(2);
            done();
        });
    });
});
