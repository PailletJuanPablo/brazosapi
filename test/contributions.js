//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block

  /** Test the /GET route  */
describe('Contributors', () => {

  describe('/GET contributors', () => {

    it('it should return all contributions', (done) => {
      chai.request(server)
          .get('/contributors')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('OK');
                res.body.contributions.should.be.a('array');
                res.body.contributions.length.should.be.eql(0);
            done();
          });
    });

  });//endGET


  /** Test the /POST route */
  describe('/POST contributors', () => {

      it('it should return contribution object', (done) => {
        let contributionCreate = {
            fullName: "Manuel Clifton",
            email: "manuclifton@gmail.com",
            type: "Type of Contribution",
            message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Contribucion creada');
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

      it('it should return message error when body request is empty', (done) => {
        let contributionCreate = {}
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          fullName: "Manuel Clifton",
          email: "manuclifton@gmail.com",
          type: "Type of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          fullName: "Manuel Clifton",
          email: "manuclifton@gmail.com"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          fullName: "Manuel Clifton"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          email: "manuclifton@gmail.com",
          type: "Type of Contribution",
          message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          type: "Type of Contribution",
          message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          fullName: "Manuel Clifton",
          type: "Type of Contribution",
          message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          fullName: "Manuel Clifton",
          message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          fullName: "Manuel Clifton",
          email: "manuclifton@gmail.com",
          message: "Message of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        let contributionCreate = {
          email: "manuclifton@gmail.com",
          type: "Type of Contribution"
        }
        chai.request(server)
            .post('/contributors')
            .send(contributionCreate)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('Missing data on the request');
              done();
            });
      });

  });//endPOST

  describe('/GET contributors', () => {

    it('it should return all contributions', (done) => {
      chai.request(server)
          .get('/contributors')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('OK');
                res.body.contributions.should.be.a('array');
                res.body.contributions.length.should.be.eql(1);
            done();
          });
    });

    it('it should return all contributions', (done) => {
      chai.request(server)
          .get('/contributors')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('OK');
                res.body.contributions.should.be.a('array');
            done();
          });
    });

  });//endGET


});//