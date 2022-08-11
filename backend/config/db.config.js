module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  PORT: "3306",
  DB: "groupomania",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
