//During the test the env variable is set to test

/*
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Testimonials', () => {

/*
  * Test the /GET route
 
  describe('/GET testimonials', () => {

      it('it should return all testimonials', (done) => {
        chai.request(server)
            .get('/testimonials')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('No testimony found.');
                  res.body.testimony.should.be.a('array');
                  res.body.testimony.length.should.be.eql(0);
              done();
            });
      });

      it('it should order testimonials by date if query param ?order=date is sended', (done) => {
        chai.request(server)
            .get('/testimonials?order=date')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.message.should.be.a('string');
                  res.body.message.should.be.equal('No testimony found.');
                  res.body.testimony.should.be.a('array');
                  res.body.testimony.length.should.be.eql(0);
              done();
            });
      });

  });

}); */