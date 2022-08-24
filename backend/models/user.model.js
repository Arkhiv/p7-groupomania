module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
      required: true,
      lowercase: true,
      trimp: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    pseudo: {
      type: Sequelize.STRING(55),
      required: true,
      minLength: 3,
      unique: true,
      trimp: true,
    },
    picture: {
      type: Sequelize.STRING,
      default: '',
    },
    bio: {
      type: Sequelize.STRING(1024),
    },
  });
  return User;
};
