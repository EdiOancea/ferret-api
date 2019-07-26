const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');

const app = require('../index');
const companyReviewFixture = require('../fixtures/companyReview');
const loadFixture = require('./loadFixture');
const { token } = require('./mockData');

describe('CRUD company review', () => {
  before(async () => {
    await loadFixture(companyReviewFixture);
  });

  describe('get company review', () => {
    describe('when an existing company review is fetched', () => {
      it('returns the company review', done => {
        request(app)
          .get('/api/companies/1/reviews/4')
          .set('Authorization', `Bearer ${token.userIdOfThree}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt'])).to.deep.equal({
              id: 4,
              comment: 'Test-CommentFour',
              companyId: 1,
              rating: 1,
              userId: 3,
              deletedAt: null,
            });
            done();
          });
      });
    });

    describe('when a non-existent company review is fetched', () => {
      it('returns 404', done => {
        request(app)
          .get('/api/companies/1/reviews/404')
          .set('Authorization', `Bearer ${token.userIdOfThree}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company review not found.' });
            done();
          });
      });
    });

    describe('when all company reviews are fetched', () => {
      it('returns the company reviews', done => {
        request(app)
          .get('/api/companies/1/reviews/')
          .set('Authorization', `Bearer ${token.userIdOfThree}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            const actualCompanyReviews = res.body.map(companyReview =>
              _.omit(companyReview, ['createdAt', 'updatedAt', 'deletedAt'])
            );
            const expectedCompanyReviews = [
              {
                id: 1,
                comment: 'Test-CommentOne',
                rating: 1,
                companyId: 1,
                userId: 3,
              },
              {
                id: 3,
                comment: 'Test-CommentThree',
                rating: 1,
                companyId: 1,
                userId: 3,
              },
              {
                id: 4,
                comment: 'Test-CommentFour',
                rating: 1,
                companyId: 1,
                userId: 3,
              }
            ];
            expect(actualCompanyReviews).to.deep.equal(expectedCompanyReviews);
            done();
          });
      });
    });
  });

  describe('post company review', () => {
    describe('when a valid company review is posted', () => {
      it('returns the company review', done => {
        request(app)
          .post('/api/companies/1/reviews/')
          .set('Authorization', `Bearer ${token.userIdOfTwo}`)
          .send({
            comment: 'Test-Comment',
            rating: 1,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(_.omit(res.body, ['createdAt', 'updatedAt', 'id'])).to.deep.equal({
              comment: 'Test-Comment',
              rating: 1,
              companyId: 1,
              userId: 2,
              deletedAt: null,
            });
            done();
          });
      });
    });

    describe('when an id is included', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies/1/reviews/')
          .set('Authorization', `Bearer ${token.userIdOfTwo}`)
          .send({
            id: 3,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              message: 'Invalid company review format.',
            });
            done();
          });
      });
    });

    describe('when any field is not valid', () => {
      it('returns 422', done => {
        request(app)
          .post('/api/companies/1/reviews/')
          .set('Authorization', `Bearer ${token.userIdOfTwo}`)
          .send({
            comment: 'Test-Comment',
            rating: 6,
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.deep.equal({
              rating: 'Invalid rating format.',
            });
            done();
          });
      });
    });

    describe('when company id is invalid', () => {
      it('returns 404', done => {
        request(app)
          .post('/api/companies/100/reviews/')
          .set('Authorization', `Bearer ${token.userIdOfTwo}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ message: 'Company not found.' });
            done();
          });
      });
    });

    describe('when user id is invalid', () => {
      it('returns 404', done => {
        request(app)
          .post('/api/companies/1/reviews/')
          .set('Authorization', `Bearer ${token.userIdOfOneHundred}`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.deep.equal({ message: 'Unauthenticated user.' });
            done();
          });
      });
    });
  });
});
