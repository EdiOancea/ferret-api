const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');

const app = require('../index');
const appointmentFixture = require('../fixtures/appointment');
const loadFixture = require('./loadFixture');

describe('CRUD appointment', () => {
  before(async () => {
    await loadFixture(appointmentFixture);
  });

  describe('get appointment', () => {
    describe('when an existing appointment is fetched', () => {
      it('returns the appointment', done => {
        request(app)
          .get('/api/companies/1/appointments/4')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(
              res.body,
              ['createdAt', 'updatedAt', 'startTime', 'endTime']
            )).to.deep.equal({
              id: 4,
              status: 'pending',
              companyId: 1,
              deletedAt: null,
            });
            const { startTime, endTime } = res.body;
            expect(new Date(startTime) - new Date('March 17, 2019 10:01:00')).to.equal(0);
            expect(new Date(endTime) - new Date('March 17, 2019 11:00:00')).to.equal(0);
            done();
          });
      });
    });

    describe('when a deleted appointment is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/companies/1/appointments/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Appointment not found.' });
            done();
          });
      });
    });

    describe('when a non-existent appointment is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/companies/1/appointments/404')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Appointment not found.' });
            done();
          });
      });
    });
  });

  describe('post appointment', () => {
    describe('when a valid appointment is posted', () => {
      it('returns the appointment', done => {
        request(app)
          .post('/api/companies/1/appointments/')
          .send({
            startTime: new Date('March 17, 2019 11:01:00'),
            endTime: new Date('March 17, 2019 12:00:00'),
            status: 'pending',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(
              res.body,
              ['createdAt', 'updatedAt', 'id', 'startTime', 'endTime']
            )).to.deep.equal({
              status: 'pending',
              companyId: 1,
              deletedAt: null,
            });
            const { startTime, endTime } = res.body;
            expect(new Date(startTime) - new Date('March 17, 2019 11:01:00')).to.equal(0);
            expect(new Date(endTime) - new Date('March 17, 2019 12:00:00')).to.equal(0);
            done();
          });
      });
    });

    describe('when an id is included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies/1/appointments/')
          .send({
            id: 3,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid appointment format.',
            });
            done();
          });
      });
    });

    describe('when some required fields are not included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies/1/appointments/')
          .send({
            startTime: new Date('March 17, 2019 12:01:00'),
            status: 'pending',
          })
          .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            endTime: 'Invalid end time format.',
          });
          done();
        });
      });
    });

    describe('when any field is not valid', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies/1/appointments/')
          .send({
            startTime: new Date('March 17, 2019 12:01:00'),
            endTime: new Date('March 17, 2019 13:00:00'),
            status: 'wrong status',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              status: 'Only statuses of pending, accepted and rejected are allowed.',
            });
            done();
          });
      });
    });

    describe('when company id is invalid', () => {
      it('returns 404', done => {
        request(app)
          .post('/api/companies/100/appointments/')
          .send({
            startTime: new Date('March 17, 2019 12:01:00'),
            endTime: new Date('March 17, 2019 13:00:00'),
            status: 'pending',
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });

    describe('when appointment overlaps with another', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies/1/appointments/')
          .send({
            startTime: new Date('March 17, 2019 11:30:00'),
            endTime: new Date('March 17, 2019 12:00:00'),
            status: 'pending',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({ message: 'Appointment is overlapping.' });
            done();
          });
      });
    });
  });

  describe('delete appointment', () => {
    describe('when an existing appointment is deleted', () => {
      it('returns the appointment', done => {
        request(app)
          .delete('/api/companies/1/appointments/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(
              res.body,
              ['createdAt', 'updatedAt', 'deletedAt', 'startTime', 'endTime']
            )).to.deep.equal({
              id: 1,
              status: 'accepted',
              companyId: 1,
            });
            const { startTime, endTime } = res.body;
            expect(new Date(startTime) - new Date('March 17, 2019 08:01:00')).to.equal(0);
            expect(new Date(endTime) - new Date('March 17, 2019 09:00:00')).to.equal(0);
            expect(res.body.deletedAt).to.not.equal(null);
            done();
          });
      });
    });

    describe('when a non-existent appointment is deleted', () => {
      it('returns 404', done => {
        request(app)
          .delete('/api/companies/1/appointments/10')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Appointment not found.' });
            done();
          });
      });
    });

    describe('when an already deleted appointment is deleted', ()=> {
      it('returns 404', done => {
        request(app)
          .delete('/api/companies/1/appointments/1')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Appointment not found.' });
            done();
          });
      });
    });

  });

  describe('put appointment', () => {
    describe('when updating a non-existent appointment', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/companies/1/appointments/10')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Appointment not found.' });
            done();
          });
      });
    });

    describe('when a deleted appointment is updated', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/companies/1/appointments/1')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Appointment not found.' });
            done();
          });
      });
    });

    describe('when invalid data is send', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/companies/1/appointments/3')
          .send({
            status: 'wrong status',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              status: 'Only statuses of pending, accepted and rejected are allowed.',
            });
            done();
          });
      });
    });

    describe('when an id is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/companies/1/appointments/3')
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
      it('returns the modified appointment', done => {
        request(app)
          .put('/api/companies/1/appointments/3')
          .send({
            startTime: new Date('March 17, 2019 09:30:00'),
            status: 'pending',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(
              res.body,
              ['createdAt', 'updatedAt', 'deletedAt', 'startTime', 'endTime']
            )).to.deep.equal({
              id: 3,
              status: 'pending',
              companyId: 1,
            });
            const { startTime, endTime } = res.body;
            expect(new Date(startTime) - new Date('March 17, 2019 09:30:00')).to.equal(0);
            expect(new Date(endTime) - new Date('March 17, 2019 10:00:00')).to.equal(0);
            done();
          });
      });
    });

    describe('when appointment overlaps with another', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/companies/1/appointments/3')
          .send({
            endTime: new Date('March 17, 2019 10:02:00'),
            status: 'pending',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({ message: 'Appointment is overlapping.' });
            done();
          });
      });
    });
  });
});
