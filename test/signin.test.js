const request = require('supertest');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const app = require('../index');
const userFixture = require('../fixtures/user');
const loadFixture = require('./loadFixture');
const privateKey = process.env.JWT_SECRET;

describe('Sign In', () => {
  before(async () => {
    await loadFixture(userFixture);
  });

  describe('when valid email and password are sent', () => {
    it('returns a token', done => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'test.email1@gmail.ro',
          password: 'parolatest',
        })
        .end(async (err, res) => {
          const token = jwt.verify(res.body.token, privateKey);
          expect(res.status).to.equal(200);
          expect(token.id).to.equal(1);
          done();
        });
    });
  });

  describe('when an invalid email is sent', () => {
    it('return 422', done => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'test.email1@gmil.ro',
          password: 'parolatest',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({ message: 'Invalid credentials.' });
          done();
        });
    });
  });

  describe('when an invalid password is sent', () => {
    it('returns 422', done => {
      request(app)
        .post('/api/signin')
        .send({
          email: 'test.email1@gmail.ro',
          password: 'parolatest1',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({ message: 'Invalid credentials.' });
          done();
        });
    });
  });
});
