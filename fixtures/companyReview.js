const createCompanyReview = require('./utils').createCompanyReview;
const companyFixture = require('./company');
const userFixture = require('./user');

module.exports = {
  ...companyFixture,
  ...userFixture,
  company_reviews: [
    {
      comment: 'Test-CommentOne',
      rating: 1,
    }, {
      comment: 'Test-CommentTwo',
      deleted_at: new Date(),
    },
    { comment: 'Test-CommentThree' },
    { comment: 'Test-CommentFour' },
  ].map(address => createCompanyReview(address)),
};
