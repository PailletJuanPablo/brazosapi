const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);

let token = "";

describe("User", () => {
  describe("POST users/session/login", () => {
    it("it should return a json web token if the body of the request has valid credentials", (done) => {
      const userCredentials = {
        email: "example@example.com",
        password: "123456789"
      };
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

    it("it should return error if the body of the request has invalid credentials", (done) => {
      const userCredentials = {
        email: "invalid@example.com",
        password: "123456789"
      };
      chai.request(server)
          .post("/users/session/login")
          .send(userCredentials)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.message.should.equal("Credenciales invalidas");
          done();
        });
    });
  });

  describe("GET /users/user", () => {
    it("it should return user data if a valid jwt is sent in the request headers", (done) => {
      chai.request(server)
          .get("/users/user")
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.firstName.should.be.a("string");
            res.body.lastName.should.be.a("string");
            res.body.email.should.be.a("string");
            res.body.roleId.should.be.a("number");
          done();
        });
    });

    it("it should return validation error if jwt is not sent in the request headers", (done) => {
      chai.request(server)
          .get("/users/user")
          .end((err, res) => {
            res.should.have.status(406);
            res.body.message.should.be.a("string");
          done();
        });
    });
  });
});
