let chai = require('chai');
let tool = require('../src/tool');

describe('tool test', function() {
    it('printName() test', function() {
        let value = tool.printName({first: 'first', last: 'last'});
        chai.expect(value).to.be.equal('last, first');
    });

    describe('aynchronous test', function() {
        it('load page', function(done) {
            tool.load({first: 'Abraham', last: 'Lincoln'}, function(html) {
                chai.expect(html).to.be.ok;
                done();
            });
        });
    });
});