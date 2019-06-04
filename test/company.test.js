const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');

const app = require('../index');
const companyFixture = require('../fixtures/company');
const loadFixture = require('./loadFixture');

describe('CRUD company', () => {
  before(async () => {
    await loadFixture(companyFixture);
  });

  describe('get company', () => {
    describe('when an existing company is fetched', () => {
      it('returns the company', done => {
        request(app)
          .get('/api/companies/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 1,
              deletedAt: null,
              name: 'TestCompany',
              rating: 0,
              fieldOfActivityId: 1,
              timetable: 'TestTimetable',
            });
            done();
          });
      });
    });

    describe('when a deleted company is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/companies/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });

    describe('when a non-existent company is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/companies/404')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });
  });

  describe('post company', () => {
    describe('when a valid company is posted', () => {
      it('returns the company', done => {
        request(app)
          .post('/api/companies')
          .send({
            name: 'TestCompanyPatru',
            fieldOfActivityId: 1,
            timetable: 'TestTimetablePatru',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt', 'id'])).to.deep.equal({
              name: 'TestCompanyPatru',
              rating: 0,
              deletedAt: null,
              fieldOfActivityId: 1,
              timetable: 'TestTimetablePatru',
            });
            done();
          });
      });
    });

    describe('when an id is included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies')
          .send({
            id: 3,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid company format.',
            });
            done();
          });
      });
    });

    describe('when field of activity id is not included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies')
          .send({
            name: 'TestCompanyCinci',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid company format.',
            });
            done();
          });
      });
    });

    describe('when field of activity id is not valid', () => {
      it('returns 404', done => {
        request(app)
          .post('/api/companies')
          .send({
            name: 'TestCompanyCinci',
            fieldOfActivityId: 20,
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              message: 'Field of activity not found.',
            });
            done();
          });
      });
    });

    describe('when company name is not valid', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies')
          .send({
            name: 'Salutti123a',
            fieldOfActivityId: 3,
            timetable: 'TestTimetablePatru',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              name: 'Invalid company name format.',
            });
            done();
          });
      });
    });

    describe('when timetable is not included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies')
          .send({
            name: 'TestCompanyCinci',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid company format.',
            });
            done();
          });
      });
    });
  });

  describe('delete company', () => {
    describe('when an existing company is deleted', () => {
      it('returns the company', done => {
        request(app)
          .delete('/api/companies/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt', 'deletedAt'])).to.deep.equal({
              id: 1,
              name: 'TestCompany',
              fieldOfActivityId: 1,
              rating: 0,
              timetable: 'TestTimetable',
            });
            expect(res.body.deletedAt).to.not.equal(null);
            done();
          });
      });
    });

    describe('when a non-existent company is deleted', () => {
      it('returns 404', done => {
        request(app)
          .delete('/api/companies/10')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });

    describe('when an already deleted company is deleted', ()=> {
      it('returns 404', done => {
        request(app)
          .delete('/api/companies/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });
  });

  describe('put company', () => {
    describe('when updating a non-existent company', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/companies/10')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });

    describe('when a deleted company is updated', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/companies/2')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });

    describe('when invalid data is send', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/companies/3')
          .send({
            name: 'Salutti123',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'You can not change the company name.',
            });
            done();
          });
      });
    });

    describe('when an id is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/companies/3')
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

    describe('when an invalid field id is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/companies/3')
          .send({
            fieldOfActivityId: 20,
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Field of activity not found.' });
            done();
          });
      });
    });

    describe('when valid data is sent', () => {
      it('returns the modified company', done => {
        request(app)
          .put('/api/companies/3')
          .send({
            fieldOfActivityId: 3,
            timetable: 'TestTimetableTrei',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 3,
              name: 'TestCompanyTrei',
              rating: 0,
              fieldOfActivityId: 3,
              deletedAt: null,
              timetable: 'TestTimetableTrei',
            });
            done();
          });
      });
    });
  });
});
