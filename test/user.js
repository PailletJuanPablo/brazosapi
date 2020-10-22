let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp)
describe ('Users', () => {
      const user = {
        firstName: 'Loloberto',
        lastName: 'Aristomuño',
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890'
      }
      const invalidUser1 = {
        firstName: 'L',
        lastName: 'Aristomuño',
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890'
      }
      const invalidUser2 = {
        firstName: 'Lolo',
        lastName: "A",
        email: 'lol@esteesmiemail.com',
        password: '1234567890'
      }
      const invalidUser3 = {
        firstName: 'Lolo',
        lastName: "Aristomunio",
        email: 'estonoesunmail',
        password: '1234567890'
      }
      const invalidUser4 = {
        lastName: 'Aristomuño',
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890'
      }
      const invalidUser5 = {
        firstName: 'Loloberto',
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890'
      }
      const invalidUser6 = {
        firstName: 'Loloberto',
        lastName: 'Aristomuño',
        password: '1234567890'
      }
      const invalidUser7 = {
        firstName: 'Loloberto',
        lastName: 'Aristomuño',
        email: Date.now() +'lol@esteesmiemail.com',
      }
      const invalidUser8 = {
        firstName: undefined,
        lastName: null,
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890'
      }
      const invalidUser9 = {
        firstName: 'Lolo',
        lastName: 'Aristomuño',
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890',
        roleId: 1
      }
      const invalidUser10 = {
        firstName: 'Lolo',
        lastName: 'Aristomuño',
        email: Date.now() +'lol@esteesmiemail.com',
        password: '1234567890',
        organizationId: 2
      }
      const invalidUser11 = null
      const invalidUser12 = undefined
      const credentials = {
        email: user.email,
        password: user.password
      }
      const userUpdateParams = {
        firstName: 'Lolo',
        // lastName: 'Aristo',
      }
      let token
      it ('should return a new user', (done) => {
        chai.request(server).post('/users').send(user).end((err, res) => {
          res.should.have.status(200)
          res.body.id.should.be.a('number')
          res.body.firstName.should.be.a('string')
          res.body.lastName.should.be.a('string')
          res.body.email.should.be.a('string')
          res.body.roleId.should.be.eql(2)
          res.body.organizationId.should.be.a('number')
          done()
        })
      })
      it('should not be repeated', (done) => {
        chai.request(server).post('/users').send(user).end((err, res) => {
          res.should.have.status(404)
          done()
        })
      })
      it('should have a first name longer than 2', (done) => {
        chai.request(server).post('/users').send(invalidUser1).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should have a last name longer than 3', (done) => {
        chai.request(server).post('/users').send(invalidUser2).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      // it('should have a valid mail format', (done) => {
      //   chai.request(server).post('/users').send(invalidUser3).end((err, res) => {
      //     res.should.have.status(400)
      //     done()
      //   })
      // })
      it('should have a first name', (done) => {
        chai.request(server).post('/users').send(invalidUser4).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should have a last name', (done) => {
        chai.request(server).post('/users').send(invalidUser5).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should have an email', (done) => {
        chai.request(server).post('/users').send(invalidUser6).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should have a password', (done) => {
        chai.request(server).post('/users').send(invalidUser7).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should reject null or undefined values', (done) => {
        chai.request(server).post('/users').send(invalidUser8).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should not have extra parameters, like roleId', (done) => {
        chai.request(server).post('/users').send(invalidUser9).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should not have extra parameters, like organizationId', (done) => {
        chai.request(server).post('/users').send(invalidUser10).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should not accept null body', (done) => {
        chai.request(server).post('/users').send(invalidUser11).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should not have undefined body', (done) => {
        chai.request(server).post('/users').send(invalidUser12).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
      it('should log in', logInDone => {
        chai.request(server).post('/users/session/login').send(credentials).end((err, res) => {
          res.should.have.status(201)
          res.body.jwt.should.be.a('string')
          logInDone()
          token = 'Bearer ' + res.body.jwt
        })
      })
      it('shouldnt return my information without token', done => {
        chai.request(server).get('/users/user').end((err, res) => {
          res.should.have.status(406)
          done()
        })
      })
      it('should return my information', done => {
        chai.request(server).get('/users/user').set('Authorization', token).end((err, res) => {
          res.should.have.status(200)
          res.body.firstName.should.be.eql(user.firstName)
          res.body.lastName.should.be.eql(user.lastName)
          res.body.email.should.be.eql(user.email)
          done()
        })
      })
      it('shouldnt change my information without token', done => {
        chai.request(server).put('/users/').send(userUpdateParams).end((err, res) => {
          res.should.have.status(406)
          // res.body.lastName.should.be.eql(userUpdateParams.lastName)
          done()
        })
      })
      it('should change my information', done => {
        chai.request(server).put('/users/').send(userUpdateParams).set('Authorization', token).end((err, res) => {
          res.should.have.status(200)
          res.body.firstName.should.be.eql(userUpdateParams.firstName)
          // res.body.lastName.should.be.eql(userUpdateParams.lastName)
          done()
        })
      })
      it('should not delete the user created without token', deleteDone => {
        console.log(token)
        chai.request(server).delete('/users/').end((err, res) => {
          res.should.have.status(406)
          deleteDone()
        }) 
      })
      it('should accept a valid token', deleteDone => {
        console.log(token)
        chai.request(server).delete('/users/').set('Authorization', 'sdlndlsfhldfskhg.dlhfbhkdfgdv.fdkuhbfkbb').end((err, res) => {
          res.should.have.status(406)
          deleteDone()
        }) 
      })
      it('should delete the user created', deleteDone => {
        console.log(token)
        chai.request(server).delete('/users/').set('Authorization', token).end((err, res) => {
          res.should.have.status(200)
          deleteDone()
        }) 
      })
      it('should not delete a deleted account', deleteDone => {
        console.log(token)
        chai.request(server).delete('/users/').set('Authorization', token).end((err, res) => {
          res.should.have.status(404)
          deleteDone()
        }) 
      })
      it('should not return my information upon delete', done => {
        chai.request(server).get('/users/user').set('Authorization', token).end((err, res) => {
          res.should.have.status(404)
          done()
        })
      })
      it('should not change my information upon delete', done => {
        chai.request(server).put('/users/').send(userUpdateParams).set('Authorization', token).end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
    
})