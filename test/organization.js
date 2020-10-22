let fs = require('fs');
let path = require('path');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Organization', () =>{

    let token = '';
    const userCredentials = {
      email: 'example@example.com',
      password: '123456789'
    }

    let tokenCommonUser ='';
    const commonUserCredentials ={
        email: 'comun@comun.com',
        password:'123456'
    }

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
        })
    })

    /**
     * TEST /GET route
     */
    describe('GET organization', () =>{
        it('It should return the organization', done =>{
            chai.request(server)
            .get('/organization/public')
            .end((err,res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('image');
                res.body.should.have.property('phone');
                res.body.should.have.property('address');
                res.body.should.have.property('welcomeText');
                res.body.should.have.property('description');
                done();
            })
        })
    })

    /**
     * TEST /PATCH route
     */
    describe('PATCH organizations name or logo', () =>{
        it('It should edit organizations name or image', done =>{
           
            ongId=1
            chai.request(server)
            .patch(`/organization/${ongId}`)
            .set({ Authorization: `Bearer ${token}` })
            .attach('media',fs.readFileSync(path.join(__dirname,'logo.png')),'logo.png')
            .field('name','Testing edit title')
            .end((err,res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('image');
                res.body.should.have.property('phone');
                res.body.should.have.property('address');
                res.body.should.have.property('welcomeText');
                res.body.should.have.property('description');
                done();
            })
        })
    })

    describe('PATCH organizations name or logo', () =>{
        it('It should not edit organizations if there is no user Admin', done =>{
           
            ongId=1
            chai.request(server)
            .patch(`/organization/${ongId}`)
            .attach('media',fs.readFileSync(path.join(__dirname,'logo.png')),'logo.png')
            .field('name','Testing edit title')
            .end((err,res) =>{
                res.should.have.status(406);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('Necesitas estar Logeado');
                done();
            })
        })
    })

    describe('PATCH organizations name or logo', () =>{
        before(function (done) {
            chai.request(server)
            .post("/users/session/login")
            .send(commonUserCredentials)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("jwt");
                res.body.jwt.should.be.a("string");
                tokenCommonUser = res.body.jwt;
                done();
            })
        })

        it('It should not edit organizations if there is common user', done =>{
           
            ongId=1
            chai.request(server)
            .patch(`/organization/${ongId}`)
            .set({ Authorization: `Bearer ${tokenCommonUser}` })
            .attach('media',fs.readFileSync(path.join(__dirname,'logo.png')),'logo.png')
            .field('name','Testing edit title')
            .end((err,res) =>{
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('Permiso no valido');
                done();
            })
        })
    })

    describe('PATCH organizations name or logo', () =>{
      
        it('It should not edit organizations if there is no name', done =>{
           
            ongId=1
            chai.request(server)
            .patch(`/organization/${ongId}`)
            .set({ Authorization: `Bearer ${token}` })
            .attach('media',fs.readFileSync(path.join(__dirname,'logo.png')),'logo.png')
            .field('name','')
            .end((err,res) =>{
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.a('string');
                res.body.msg.should.be.equal('Faltan datos');
                done();
            })
        })
    })
})