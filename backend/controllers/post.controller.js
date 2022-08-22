/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
const db = require('../models');

const Post = db.post;
const { Op } = require('sequelize');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');

exports.readPost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(404).json({
        error,
      });
    });
};

exports.readAllPosts = (req, res) => {
  Post.findAll()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(400).json({
        error,
      });
    });
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file) {
    try {
      if (
        req.file.detectedMimeType !== 'image/jpg' &&
        req.file.detectedMimeType !== 'image/png' &&
        req.file.detectedMimeType !== 'image/jpeg'
      )
        throw Error('invalid file');

      if (req.file.size > 5000000) throw Error('max size');

      fileName = `${req.body.posterId}_${Date.now().toString()}.jpg`;

      console.log('SALUTUUT', fileName);

      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
        )
      );
    } catch (err) {
      console.log('error', err);
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
  }

  const newPost = Post.build({
    posterId: req.body.posterId,
    message: req.body.message,
    picture:
      req.file !== null && typeof req.file !== 'undefined'
        ? `./uploads/posts/${fileName}`
        : '',
    video: req.body.video,
    likers: 0,
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.updatePost = (req, res) => {
  Post.update(
    {
      message: req.body.message,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      res.status(201).json({
        message: 'Votre Post a bien été modifié !',
      });
    })
    .catch(error => {
      res.status(400).json({
        error,
      });
    });
};

exports.deletePost = (req, res) => {
  const userId = req.params.id;
  Post.destroy({ where: { id: userId } })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Post supprimé!',
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${userId}. Maybe Post was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Post with id=${userId}`,
      });
    });
};
