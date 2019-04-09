const createUser = (user) => ({
  first_name: "Test First Name",
  last_name: "Testlastname",
  password: "$2a$10$Fex1ChEw5YOneQL02/Pjl.CZ4wpxc/sq6TbzgmFwT/SIHn0lX6fTS", // "parolatest"
  rating: 5,
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  ...user,
});

module.exports = {
  createUser,
}
