const db = require("../models");
const User = db.user;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userSignUp = User.build({
        email: req.body.email,
        password: hash,
      });
      userSignUp.save();
      res.status(201).json({ message: "Utilisateur créé !" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN", // A REMPLACER //
              { expiresIn: "12h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyUser = (req, res, next) => {
  User.update(
    {
      email: req.body.email,
      password: req.body.password,
      pseudo: req.body.pseudo,
      picture: req.body.picture,
      bio: req.body.bio,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      res.status(201).json({
        message: "Votre profil a bien été modifié !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  User.destroy({ where: { id: userId } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Utilisateur supprimé!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${userId}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete User with id=${userId}`,
      });
    });
};