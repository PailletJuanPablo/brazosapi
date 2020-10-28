const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let should = chai.should();
const fs = require('fs');
const path = require('path');

chai.use(chaiHttp);

let token = '';
const user = {
  email: 'example@example.com',
  password: '123456789'
}
const entrieID = 1;

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
      chai.request(server).get('/entries/'+ entrieID)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.equal('No existe una entrada con ese ID');
        done();
      });
    });

    //POST
    before(function (done) {
      chai.request(server)
        .post("/users/session/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("jwt");
          res.body.jwt.should.be.a("string");
          token = res.body.jwt;
          done();
        });
    });

    it('it should return error Not logged in', (done) => {
      chai.request(server)
        .post('/entries')
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Necesitas estar Logeado');
          done();
        });
    });

    it('it should return error jwt expired', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('jwt expired');
          done();
        });
    });

    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', '')
        .field('content', '')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .field('title', '')
        .field('content', '')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return errorinformation incomplete', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', 'Titulo de Prueba')
        .field('content', '')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', 'Titulo de Prueba')
        .field('content', 'Contenido de pueba para una nueva entrada')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });
    it('it should return error property mimetype of undefined', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .field('title', 'Titulo de Prueba')
        .field('content', 'Contenido de pueba para una nueva entrada')
        .field('category', 'Novedades')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal("Cannot read property 'mimetype' of undefined");
          done();
        });
    });
    it('it should return object success', (done) => {
      chai.request(server)
        .post('/entries')
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', 'Titulo de Prueba')
        .field('content', 'Contenido de pueba para una nueva entrada')
        .field('category', 'Novedades')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('image');
          res.body.should.have.property('category');
          res.body.should.have.property('contentType');
          res.body.should.have.property('createdAt');
          done();
        });
    });

    //PUT
    it('it should return error Not logged in', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Necesitas estar Logeado');
          done();
        });
    });
    it('it should return error jwt expired', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('jwt expired');
          done();
        });
    });
    it('it should return error for ID not exist', (done) => {
      chai.request(server)
        .put('/entries/100')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.msg.should.be.a('string');
          res.body.msg.should.be.equal('No existe una entrada con ese ID');
          done();
        });
    });
    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });

    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .field('title', '')
        .field('content', '')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });

    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', '')
        .field('content', '')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });

    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', 'Titulo de Prueba Cambio')
        .field('content', '')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });

    it('it should return error information incomplete', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', 'Titulo de Prueba Cambio')
        .field('content', 'Contenido de pueba para una nueva entrada')
        .field('category', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        });
    });

    it('it should return object success', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .field('title', 'Titulo de Prueba Cambio')
        .field('content', 'Contenido de pueba para una modificacion de entrada')
        .field('category', 'Eventos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('image');
          res.body.should.have.property('contentType');
          res.body.should.have.property('category');
          res.body.should.have.property('deletedAt');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });

    it('it should return object success', (done) => {
      chai.request(server)
        .put('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .attach('media', fs.readFileSync(path.join(__dirname, 'tenedor.jpg')), 'tenedor.jpg')
        .field('title', 'Titulo de Prueba Cambio')
        .field('content', 'Contenido de pueba para una modificacion de entrada')
        .field('category', 'Eventos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('image');
          res.body.should.have.property('contentType');
          res.body.should.have.property('category');
          res.body.should.have.property('deletedAt');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });

    //DELETE

    it('it should return error Not logged in', (done) => {
      chai.request(server)
        .delete('/entries/' + entrieID)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Necesitas estar Logeado');
          done();
        });
    });

    it('it should return error jwt expired', (done) => {
      chai.request(server)
        .delete('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('jwt expired');
          done();
        });
    });

    it('it should return error for ID not exist', (done) => {
      chai.request(server)
        .delete('/entries/100')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.msg.should.be.a('string');
          res.body.msg.should.be.equal('Entry was not found.');
          done();
        });
    });

    it('it should return delete ok', (done) => {
      chai.request(server)
        .delete('/entries/' + entrieID)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('Entry has been deleted.');
          res.body.entry.should.be.a('object');
          res.body.entry.should.have.property('id');
          res.body.entry.should.have.property('title');
          res.body.entry.should.have.property('content');
          res.body.entry.should.have.property('image');
          res.body.entry.should.have.property('contentType');
          res.body.entry.should.have.property('category');
          res.body.entry.should.have.property('deletedAt');
          res.body.entry.should.have.property('createdAt');
          res.body.entry.should.have.property('updatedAt');
          done();
        });
    });


});