//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Contributors', () => {
  let contributionCreate = {
    fullName: "Manuel Clifton",
    email: "manuclifton@gmail.com",
    type: "Type of Contribution",
    message: "Message of Contribution"
  }
  let contributionIsEmpty = {}
  let contributionFailMessage = {
    fullName: "Manuel Clifton",
    email: "manuclifton@gmail.com",
    type: "Type of Contribution"
  }
  let contributionFailType = {
    fullName: "Manuel Clifton",
    email: "manuclifton@gmail.com",
    message: "Message of Contribution"
  }
  let contributionFailEmail = {
    fullName: "Manuel Clifton",
    type: "Type of Contribution",
    message: "Message of Contribution"
  }
  let contributionFailFullname
   = {
    email: "manuclifton@gmail.com",
    type: "Type of Contribution",
    message: "Message of Contribution"
  }

  //GET
    it('it should return all contributions if not contributions', (done) => {
      chai.request(server).get('/contributors').end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('string');
        res.body.message.should.be.equal('OK');
        res.body.contributions.should.be.a('array');
        res.body.contributions.length.should.be.eql(0);
        done();
      });
    });

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

      it('it should return message error when body request is empty', (done) => {
        chai.request(server).post('/contributors').send(contributionIsEmpty)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.be.a('string');
            res.body.message.should.be.equal('No se han ingresado datos');
          done();
        });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        chai.request(server).post('/contributors').send(contributionFailMessage)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        chai.request(server).post('/contributors').send(contributionFailType)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.be.a('string');
            res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        chai.request(server).post('/contributors').send(contributionFailEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
      });
      it('it should return the error message when the request body is missing some data', (done) => {
        chai.request(server).post('/contributors').send(contributionFailFullname)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
      });
      it('it should  if error database in post', (done) => {
        chai.request(server).post('/contributors').send(contributionCreate)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.message.should.be.a('string');
          done();
        });
      });
//GET
    it('it should return all contributions', (done) => {
      chai.request(server).get('/contributors')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('string');
        res.body.message.should.be.equal('OK');
        res.body.contributions.should.be.a('array');
        done();
      });
    });
    it('it should  if error database in get', (done) => {
      chai.request(server).get('/contributors')
      .end((err, res) => {
        res.should.have.status(500);
        res.body.message.should.be.a('string');
        done();
      });
    });

});