const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');

const app = require('../index');
const addressFixture = require('../fixtures/address');
const loadFixture = require('./loadFixture');

describe('CRUD address', () => {
  before(async () => {
    await loadFixture(addressFixture);
  });

  describe('get address', () => {
    describe('when an existing address is fetched', () => {
      it('returns the address', done => {
        request(app)
          .get('/api/addresses/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 1,
              country: 'Test-CountryOne',
              apartmentNumber: 1,
              city: 'Test-City',
              streetName: 'Test street Name',
              streetNumber: 3,
              deletedAt: null,
            });
            done();
          });
      });
    });

    describe('when a deleted address is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/addresses/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Address not found.' });
            done();
          });
      });
    });

    describe('when a non-existent address is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/addresses/404')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Address not found.' });
            done();
          });
      });
    });
  });

  describe('post address', () => {
    describe('when a valid address is posted', () => {
      it('returns the address', done => {
        request(app)
        .post('/api/addresses')
        .send({
          country: 'Test-Country',
          city: 'Test-City',
          streetName: 'Test street Name',
          streetNumber: 33,
          apartmentNumber: 100,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(_.omit(res.body, ['createdAt', 'updatedAt', 'id'])).to.deep.equal({
            country: 'Test-Country',
            city: 'Test-City',
            streetName: 'Test street Name',
            streetNumber: 33,
            apartmentNumber: 100,
            deletedAt: null,
          });
          done();
        });
      });
    });

    describe('when an id is included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/addresses')
          .send({
            id: 3,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid address format.',
            });
            done();
          });
      });
    });

    describe('when some required fields are not included', () => {
      it('returns 422', done => {
        request(app)
        .post('/api/addresses')
        .send({
          country: 'Test-Countryoof',
          city: 'Test-City',
          streetNumber: 3,
          apartmentNumber: 13,
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            streetName: 'Invalid street name format.',
          });
          done();
        });
      });
    });

    describe('when any field is not valid', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/addresses')
          .send({
            country: 'Test-Country',
            city: 'Test-City',
            streetName: 'Test street123 Name',
            streetNumber: 3,
            apartmentNumber: 13,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              streetName: 'Invalid street name format.',
            });
            done();
          });
      });
    });
  });

  describe('delete address', () => {
    describe('when an existing address is deleted', () => {
      it('returns the address', done => {
        request(app)
          .delete('/api/addresses/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt', 'deletedAt'])).to.deep.equal({
              id: 1,
              country: 'Test-CountryOne',
              city: 'Test-City',
              streetName: 'Test street Name',
              streetNumber: 3,
              apartmentNumber: 1,
            });
            expect(res.body.deletedAt).to.not.equal(null);
            done();
          });
      });
    });

    describe('when a non-existent address is deleted', () => {
      it('returns 404', done => {
        request(app)
          .delete('/api/addresses/10')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Address not found.' });
            done();
          });
      });
    });

    describe('when an already deleted address is deleted', ()=> {
      it('returns 404', done => {
        request(app)
          .delete('/api/addresses/2')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Address not found.' });
            done();
          });
      });
    });

  });

  describe('put address', () => {
    describe('when updating a non-existent address', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/addresses/10')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Address not found.' });
            done();
          });
      });
    });

    describe('when a deleted address is updated', () => {
      it('returns 404', done => {
        request(app)
          .put('/api/addresses/2')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Address not found.' });
            done();
          });
      });
    });

    describe('when invalid data is send', () => {
      it('returns 422', done => {
        request(app)
        .put('/api/addresses/4')
        .send({
          country: 'oof222',
        })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              country: 'Invalid country format.',
            });
            done();
          });
      });
    });

    describe('when an id is sent', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/addresses/4')
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
      it('returns the modified address', done => {
        request(app)
          .put('/api/addresses/4')
          .send({
            country: 'Sambuca',
            city: 'Amterminat',
            streetName: 'Bifoofay',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 4,
              country: 'Sambuca',
              city: 'Amterminat',
              streetName: 'Bifoofay',
              streetNumber: 3,
              apartmentNumber: 13,
              deletedAt: null,
            });
            done();
          });
      });
    });

    describe('when update results in duplicates', () => {
      it('returns 422', done => {
        request(app)
          .put('/api/addresses/4')
          .send({
            country: 'Test-CountryOne',
            city: 'Test-City',
            streetName: 'Test street Name',
            streetNumber: 3,
            apartmentNumber: 1,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              country: 'country must be unique',
              city: 'city must be unique',
              street_name: 'street_name must be unique',
              street_number: 'street_number must be unique',
              apartment_number: 'apartment_number must be unique',
            });
            done();
          });
      });
    });
  });
});
