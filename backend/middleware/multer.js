/* eslint-disable consistent-return */
const fs = require('fs');
const { promisify } = require('util');
const db = require('../models');

const User = db.user;
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== 'image/jpg' &&
      req.file.detectedMimeType !== 'image/png' &&
      req.file.detectedMimeType !== 'image/jpeg'
    )
      throw Error('invalid file');

    if (req.file.size > 5000000) throw Error('max size');
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = `${req.body.name}.jpg`;

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
    )
  );
  try {
    User.update(
      {
        picture: `./uploads/profil/${fileName}`,
      },
      { where: { id: req.body.userId } }
    ).then(() => {
      res.status(201).json({
        message: 'Votre profil a bien été modifié !',
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
