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

describe('Entry', () => {

  //GET
  it('it should return all entries if not entries', (done) => {
    chai.request(server).get('/contributors').end((err, res) => {
      res.should.have.status(200);
      res.body.message.should.be.a('string');
      res.body.message.should.be.equal('OK');
      res.body.entries.should.be.a('array');
      res.body.entries.length.should.be.eql(0);
      done();
    });
  });

    it('it should return all entries', (done) => {
      chai.request(server)
        .get('/entries')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('OK');
          res.body.entries.should.be.a('array');
          done();
        });
    });
    it('it should return entri for ID', (done) => {
      const entrieID = 1;
      chai.request(server)
        .get('/entries/'+ entrieID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('image');
          res.body.should.have.property('contentType');
          res.body.should.have.property('category');
          res.body.should.have.property('updatedAt');
          done();
        });
    });

    it('it should return entri for ID not exist', (done) => {
      const entrieID = 25;
      chai.request(server)
        .get('/entries/'+ entrieID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.equal('No existe una entrada con ese ID');
          done();
        });
    });

    /*
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
      });*/



});