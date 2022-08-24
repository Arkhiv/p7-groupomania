module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    'post',
    {
      posterId: {
        type: Sequelize.STRING,
        required: true,
      },
      message: {
        type: Sequelize.STRING(250),
        trim: true,
      },
      picture: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.STRING,
      },

      likers: {
        type: Sequelize.JSON,
      },
    },
    {
      timestamps: true,
    }
  );
  return Post;
};
