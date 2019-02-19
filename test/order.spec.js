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
        this.warehouse = {
            packageAndShip: sinon.stub().yields(123456789)
        };
        order.__set__('inventoryData', testdata);
        order.__set__('console', this.console);
        order.__set__('warehouse', this.warehouse);
    });
    
    it('order a product', function(done) {
        let _this = this;
        order.orderItem('P', 9, function() {
            chai.expect(_this.console.log.callCount).to.be.equal(2);
            done();
        });
    });

    describe('warehouse', function() {
        beforeEach(function() {
            this.callback = sinon.spy();
            order.orderItem('P', 9, this.callback);
        });

        it('correct number has been passed to it', function(done) {
            chai.expect(this.callback.calledWith(123456789)).to.equal(true);  
            done();          
        });

        it('call with correct arguments', function() {
            chai.expect(this.warehouse.packageAndShip.calledWith('P', 9)).to.equal(true);
        });
    });
});
