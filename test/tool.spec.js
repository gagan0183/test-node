let chai = require('chai');
let tool = require('../src/tool');

describe('tool test', function() {
    it('printName() test', function() {
        let value = tool.printName({first: 'first', last: 'last'});
        chai.expect(value).to.be.equal('last, first');
    });
});