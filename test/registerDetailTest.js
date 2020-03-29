const expect = require('expect');
const request = require('request');
const chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should()
chai.use(chaiHttp)
let registerDetails = {
    "first_name": "Amit",
    "last_name": "Verma",
    "mobile": "9893273970",
    "roles": "patient"
}
describe('RegisterDetails', () => {
    describe('/RegisterDetails Test Cases', () => {
        it('RegisterDetailsTest', (done) => {
            chai.request(server)
                .post('/api/v2/registration/register')
                .send(registerDetails)
                .end((err, res) => {
                    if (err) throw err
                    if (should)
                        res.should.have.status(200)
                    done()
                })
        })
    })
});