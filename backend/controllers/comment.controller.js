/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
const db = require('../models');

const Comment = db.comment;
const { Op } = require('sequelize');
const fs = require('fs');

exports.readComment = (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(error => {
      res.status(404).json({
        error,
      });
    });
};

exports.readAllComments = (req, res) => {
  Comment.findAll()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      res.status(400).json({
        error,
      });
    });
};

exports.createComment = (req, res) => {
  const newComment = Comment.build({
    commenterId: req.body.commenterId,
    commenterPseudo: req.body.commenterPseudo,
    text: req.body.text,
  });
  newComment
    .save()
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.updateComment = (req, res) => {
  Comment.update(
    {
      text: req.body.text,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      res.status(201).json({
        message: 'Votre Commentaire a bien été modifié !',
      });
    })
    .catch(error => {
      res.status(400).json({
        error,
      });
    });
};

exports.deleteComment = (req, res) => {
  const userId = req.params.id;
  Comment.destroy({ where: { id: userId } })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Commentaire supprimé!',
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${userId}. Maybe Comment was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Comment with id=${userId}`,
      });
    });
};
