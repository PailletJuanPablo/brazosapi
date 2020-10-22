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
  /*GET ROUTE*/
  describe('/GET testimonials', () => {
    it('it should return all testimonials', (done) => {
      chai.request(server)
        .get('/testimonials')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('OK');
          res.body.testimony.should.be.a('array');
          done();
        });
    });
    /*
    it('it should return error No Testimonies Found', (done) => {
      chai.request(server)
        .get('/testimonials')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('No Testimonies Found');
          res.body.testimony.should.be.a('array');
          res.body.testimony.length.should.be.eql(0);
          done();
        });
    });*/
  });/*END GET ROUTE*/
  /*CREATE ROUTE*/
  before(function (done) {
    chai.request(server)
      .post("/users/session/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("jwt");
        res.body.jwt.should.be.a("string");
        token = res.body.jwt;
        done();
      });
  });
  describe('/POST testimonials', () => {
    it('it should return error Necesitas estar logueado', (done) => {
      chai.request(server)
        .post('/testimonials')
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Necesitas estar Logeado');
          done();
        });
    });
    it('it should return error Informacion incorrecta', (done) => {
      chai.request(server)
        .post('/testimonials')
        .set({ Authorization: `Bearer ${token}` })
        .field('name', '')
        .field('content', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return error Informacion incorrecta', (done) => {
      chai.request(server)
        .post('/testimonials')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('name', '')
        .field('content', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return error Informacion incorrecta', (done) => {
      chai.request(server)
        .post('/testimonials')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('name', 'prueba testimonio')
        .field('content', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return error Informacion incorrecta', (done) => {
      chai.request(server)
        .post('/testimonials')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('name', '')
        .field('content', 'prueba testimonio')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return object success', (done) => {
      chai.request(server)
        .post('/testimonials')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('name', 'texto de prueba')
        .field('content', 'texto de prueba')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('content');
          res.body.should.have.property('image');
          res.body.should.have.property('createdAt');
          done();
        });
    });
  });/*END CREATE ROUTE*/
  /*PUT ROUTE*/
  before(function (done) {
    chai.request(server)
      .post("/users/session/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("jwt");
        res.body.jwt.should.be.a("string");
        token = res.body.jwt;
        done();
      });
  });
  describe('/PUT testimonials', () => {
    it('it should return error Not Acceptable', (done) => {
      chai.request(server)
        .put('/testimonials/1')
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Necesitas estar Logeado');
          done();
        });
    });
    it('it should return error Not Found', (done) => {
      chai.request(server)
        .put('/testimonials/100')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.msg.should.be.a('string');
          res.body.msg.should.be.equal('NO EXISTE UN TESTIMONIO CON ESE ID');
          done();
        });
    });
    it('it should return object success', (done) => {
      chai.request(server)
        .put('/testimonials/1')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('name', 'texto de prueba')
        .field('content', 'texto de prueba')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('content');
          res.body.should.have.property('image');
          res.body.should.have.property('organizationId');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          res.body.should.have.property('deletedAt');
          done();
        });
    });
  });/*END PUT ROUTE*/
});