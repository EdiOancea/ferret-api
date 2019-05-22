const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');

const app = require('../index');
const userFixture = require('../fixtures/user');
const loadFixture = require('./loadFixture');

describe('CRUD user', () => {
  before(async () => {
    await loadFixture(userFixture);
  });

  describe('get user', () => {
    describe('when an existing user is fetched', () => {
      it('returns the user', done => {
        request(app)
          .get('/api/users/3')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 3,
              companyId: 1,
              firstName: 'Test First Name',
              lastName: 'Testlastname',
              email: 'test.email1@gmail.ro',
              deletedAt: null,
              rating: 0,
            });
            done();
          });
      });
    });

    describe('when a deleted user is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/users/1')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'User not found.' });
            done();
          });
      });
    });

    describe('when a non-existent user is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/users/404')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'User not found.' });
            done();
          });
      });
    });
  });

  describe('post user', () => {
    describe('when a valid user is posted', () => {
      it('returns the user', done => {
        request(app)
        .post('/api/users')
        .send({
          firstName: 'Test First Name',
          lastName: 'Testlastname',
          email: 'testemailpost@gmail.com',
          password: 'testpassword',
          rating: 4,
          companyId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(_.omit(res.body, ['createdAt', 'updatedAt', 'id'])).to.deep.equal({
            firstName: 'Test First Name',
            lastName: 'Testlastname',
            email: 'testemailpost@gmail.com',
            rating: 4,
            deletedAt: null,
            companyId: 1,
          });
          done();
        });
      });
    });

    describe('when an id is included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/users')
          .send({
            id: 3,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid user format.',
            });
            done();
          });
      });
    });

    describe('when email is not included', () => {
      it('returns 422', done => {
        request(app)
        .post('/api/users')
        .send({
          firstName: 'Test First Name',
          lastName: 'Testlastname',
          password: 'testpassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            email: 'Invalid email format.',
          });
          done();
        });
      });
    });

    describe('when name is not sent', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/users')
          .send({
            email: 'testemail@gmail.com',
            password: 'testpassword',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              firstName: 'Invalid first name format.',
              lastName: 'Invalid last name format.',
            });
            done();
          });
      });
    });

    describe('when password is not sent', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/users')
          .send({
            email: 'testemail@gmail.com',
            firstName: 'Test First Name',
            lastName: 'Testlastname',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              password: 'Password needs to be between 8 to 20 characters long.',
            });
            done();
          });
      });
    });

    describe('when any field is not valid', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/users')
          .send({
            email: 'asda',
            firstName: '121',
            lastName: '121',
            password: 'oof',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              email: 'Invalid email format.',
              firstName: 'Invalid first name format.',
              lastName: 'Invalid last name format.',
              password: 'Password needs to be between 8 to 20 characters long.',
            });
            done();
          });
      });
    });

    describe('when user email is already used', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/users')
          .send({
            firstName: 'Eduard Algo',
            lastName: 'Oancea',
            email: 'test.email1@gmail.ro',
            password: 'saluttitutti',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({ message: 'Email already used.' });
            done();
          });
      });
    });
  });

  describe('delete user', () => {
    describe('when an existing user is deleted', () => {
      it('returns the user', done => {
        request(app)
          .delete('/api/users/3')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt', 'deletedAt'])).to.deep.equal({
              id: 3,
              email: 'test.email1@gmail.ro',
              firstName: 'Test First Name',
              lastName: 'Testlastname',
              rating: 0,
              companyId: 1,
            });
            expect(res.body.deletedAt).to.not.equal(null);
            done();
          });
      });
    });

    describe('when a non-existent user is deleted', () => {
      it('returns 404', done => {
        request(app)
          .delete('/api/users/10')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'User not found.' });
            done();
          });
      });
    });

    describe('when an already deleted user is deleted', ()=> {
      it('returns 404', done => {
        request(app)
          .delete('/api/users/1')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'User not found.' });
            done();
          });
      });
    });
  });

  describe('put user', () => {
    describe('when updating a non-existent user', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/users/10')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'User not found.' });
            done();
          });
      });
    });

    describe('when a deleted user is updated', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/users/1')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'User not found.' });
            done();
          });
      });
    });

    describe('when invalid data is sent', () => {
      it('returns 422', done => {
        request(app)
        .put('/api/users/2')
        .send({
          firstName: 'Eduar-5yeet',
          lastName: 'Yeeet11',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            firstName: 'Invalid first name format.',
            lastName: 'Invalid last name format.',
          });
          done();
        });
      });
    });

    describe('when email is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/users/3')
          .send({
            email: 'ceva.email@gmail.com',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({ message: 'You can not change the email.' });
            done();
          });
      });
    });

    describe('when an id is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/users/3')
          .send({
            id: 13,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({ message: 'You can not change the id.' });
            done();
          });
      });
    });

    describe('when a password is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/users/3')
          .send({
            password: 'bigfkinoof',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({ message: 'You can not change the password.' });
            done();
          });
      });
    });

    describe('when valid data is sent', () => {
      it('returns the modified user', done => {
        request(app)
          .put('/api/users/2')
          .send({
            firstName: 'Salutti My Friend',
            lastName: 'Unsingurcuvant',
            rating: 10,
            companyId: 1,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 2,
              firstName: 'Salutti My Friend',
              lastName: 'Unsingurcuvant',
              email: 'test.email3@gmail.ro',
              companyId: 1,
              rating: 10,
              deletedAt: null,
            });
            done();
          });
      });
    });
  });
});
