const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let should = chai.should();
const fs = require('fs');
const path = require('path');

chai.use(chaiHttp);

let token = '';
const userCredentials = {
  email: 'example@example.com',
  password: '123456789'
}

describe('Testimonials', () => {

    //POST
    it('it should return contribution object', (done) => {
        chai.request(server).post('/contributors').send(contributionCreate)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('OK');
          res.body.contribution.should.be.a('object');
          res.body.contribution.should.have.property('id');
          res.body.contribution.should.have.property('fullName');
          res.body.contribution.should.have.property('email');
          res.body.contribution.should.have.property('type');
          res.body.contribution.should.have.property('message');
          res.body.contribution.should.have.property('createdAt');
          done();
        });
      });


});