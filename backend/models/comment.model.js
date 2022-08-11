module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      commenterId: {
        type: Sequelize.STRING,
      },
      commenterPseudo: {
        type: Sequelize.STRING,
        trim: true,
        maxLength: 55,
      },

      text: {
        type: Sequelize.STRING,
        trim: true,
        maxLength: 250,
      },
    },
    {
      timestamps: true,
    }
  );
  return Comment;
};
