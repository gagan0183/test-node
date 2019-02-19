var expect = require('chai').expect;
var rewire = require('rewire');
var app = rewire('../src/app');
var request = require('supertest');

describe("Dictionary App", function () {

    it("Loads the home page", function(done) {
        request(app).get('/').expect(200).end(done);
    });

    describe("Dictionary API", function () {

        beforeEach(function () {

        	this.defs = [
                {
                    term: "One",
                    defined: "Term One Defined"
                },
                {
                    term: "Two",
                    defined: "Term Two Defined"
                }
            ];

            app.__set__("skierTerms", this.defs);
        });

        it("GETS dictionary-api", function(done) {
            const _this = this;
            request(app).get('/dictionary-api').expect(200).end(function(err, res) {
                const terms = JSON.parse(res.text);
                expect(terms).to.deep.equal(_this.defs);
                done();
            });
        });

        it("POSTS dictionary-api", function(done) {
            request(app).post('/dictionary-api').send({term: 'term',defined: 'term'}).expect(200).end(done);
        });

        it("DELETES dictionary-api", function(done) {
            request(app).delete('/dictionary-api/One').expect(200).end(done);
        });

    });

});