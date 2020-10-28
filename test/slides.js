
const db= require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const fs = require('fs');
const path = require('path');



chai.use(chaiHttp);
//Our parent block
describe('Slides', () => {

  after(function(done) {

    db.Slides.destroy({ truncate: { cascade: false } })
    .then(() => {
      res.json({ status: true });
    }, (err) => {
      console.log('truncate: ', err);
      res.json(err);
    });
    done();
  })


  /*
  * Test the /GET route
  */
  describe('/GET slides', () => {
    it('it should return all slides', (done) => {
      chai
        .request(server)
        .get('/slides/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.a('string');
          res.body.message.should.be.equal('OK');
          res.body.slides.should.be.a('array');
          res.body.slides.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * Test the /POST route
   */

  describe('/POST slides', () =>{
    it('it should POST a slide', done =>{
      chai
        .request(server)
        .post('/slides')
        .attach('media',fs.readFileSync(path.join(__dirname,'aguila.jpg')),'aguila.jpg')
        .field('bienvenida', 'texto de prueba')
        .field('text', 'customValue')
        .field('order', 7)
        .end((err,res) =>{
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('bienvenida');
          res.body.should.have.property('text');
          res.body.should.have.property('order');
          res.body.should.have.property('image');
          done();
        })
    })
  })

  describe('/POST slides', () =>{
    it('it should no POST a slide if there no is text is empty', done =>{
      chai
        .request(server)
        .post('/slides')
        .attach('media',fs.readFileSync(path.join(__dirname,'aguila.jpg')),'aguila.jpg')
        .field('bienvenida', 'texto de prueba')
        .field('text', '')
        .field('order', 7)
        .end((err,res) =>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.equal('Informacion incorrecta');
          done();
        })
    })
  })
  /**
   * Test the /PUT route
   */
  
  describe('/PUT/:id Slides', () => {
    it('it should not update the slide info', (done) => {
        const slide = {
            bienvenida: 'Testing slide',
            text: 'some text for testing',
        }
        const slideId = 78;
         chai.request(server)
         .put('/slides/'+ slideId)
         .send(slide)
         .end((err, res) => {
             res.should.have.status(404);
             res.body.should.be.a('object');
             res.body.should.have.property('message');
             res.body.message.should.be.equal('No existe un slide con ese ID');
             done();
         });
    });
  });

})
