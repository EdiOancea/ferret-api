const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');

const app = require('../index');
const fieldOfActivityFixture = require('../fixtures/fieldOfActivity');
const loadFixture = require('./loadFixture');

describe('CRUD fieldOfActivity', () => {
  before(async () => {
    await loadFixture(fieldOfActivityFixture);
  });

  describe('get fieldOfActivity', () => {
    describe('when an existing field is fetched', () => {
      it('returns the field', done => {
        request(app)
          .get('/api/fields-of-activity/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 1,
              name: 'FieldOfActivity',
              deletedAt: null,
            });
            done();
          });
      });
    });

    describe('when a deleted field is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/fields-of-activity/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });

    describe('when a non-existent field is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/fields-of-activity/404')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });
  });

  describe('post fieldOfActivity', () => {
    describe('when a valid field is posted', () => {
      it('returns the field', done => {
        request(app)
        .post('/api/fields-of-activity')
        .send({
          name: 'Merge',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(_.omit(res.body, ['createdAt', 'updatedAt', 'id'])).to.deep.equal({
            name: 'Merge',
            deletedAt: null,
          });
          done();
        });
      });
    });

    describe('when an id is included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/fields-of-activity')
          .send({
            id: 3,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid field of activity format.',
            });
            done();
          });
      });
    });

    describe('when some required fields are not included', () => {
      it('returns 422', done => {
        request(app)
        .post('/api/fields-of-activity')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            message: 'Invalid field of activity format.',
          });
          done();
        });
      });
    });

    describe('when any field is not valid', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/fields-of-activity')
          .send({
            name: '123123',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              name: 'Invalid field of activity format.',
            });
            done();
          });
      });
    });

    describe('when an existing field is inserted', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/fields-of-activity')
          .send({
            name: 'FieldOfActivity',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Field of activity already exists.',
            });
            done();
          });
      });
    });
  });

  describe('delete fieldOfActivity', () => {
    describe('when an existing field is deleted', () => {
      it('returns the field', done => {
        request(app)
          .delete('/api/fields-of-activity/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt', 'deletedAt'])).to.deep.equal({
              id: 1,
              name: 'FieldOfActivity',
            });
            expect(res.body.deletedAt).to.not.equal(null);
            done();
          });
      });
    });

    describe('when a non-existent address is deleted', () => {
      it('returns 404', done => {
        request(app)
          .delete('/api/fields-of-activity/10')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });

    describe('when an already deleted field is deleted', ()=> {
      it('returns 404', done => {
        request(app)
          .delete('/api/fields-of-activity/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });

  });

  describe('put fieldOfActivity', () => {
    describe('when updating a non-existent field', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/fields-of-activity/10')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });

    describe('when a deleted field is updated', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/fields-of-activity/2')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });

    describe('when invalid data is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/fields-of-activity/4')
          .send({
            name: 'oof222',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              name: 'Invalid field of activity format.',
            });
            done();
          });
      });
    });

    describe('when an id is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/fields-of-activity/4')
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

    describe('when valid data is sent', () => {
      it('returns the modified field', done => {
        request(app)
          .put('/api/fields-of-activity/4')
          .send({
            name: 'AoloGucci',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 4,
              name: 'AoloGucci',
              deletedAt: null,
            });
            done();
          });
      });
    });

    describe('when update results in duplicates', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/fields-of-activity/3')
          .send({
            name: 'FieldOfActivity',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              name: 'name must be unique',
            });
            done();
          });
      });
    });
  });
});
