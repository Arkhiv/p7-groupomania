module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    'post',
    {
      posterId: {
        type: Sequelize.STRING,
        required: true,
      },
      message: {
        type: Sequelize.STRING,
        trim: true,
        maxLength: 250,
      },
      picture: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.STRING,
      },

      likers: {
        type: [String],
      },
    },
    {
      timestamps: true,
    }
  );
  return Post;
};
