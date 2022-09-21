const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models');

const User = db.user;

const app = express();
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HED,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Groupomania' });
});

// routing
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running test on port ${PORT}.`);
});

// db.sequelize.sync().then(() =>
//   bcrypt.hash('admin', 10).then(hash => {
//     User.create({
//       email: 'admin@admin.com',
//       password: hash,
//       pseudo: 'admin',
//       statut: 1,
//     });
//   })
// );

function isAdminExist() {
  User.findOne({ where: { pseudo: 'admin' } });
  if (!isAdminExist) {
    bcrypt.hash('admin', 10).then(hash => {
      User.create({
        email: 'admin@admin.com',
        password: hash,
        pseudo: 'admin',
        statut: 1,
      });
    });
    db.sequelize.sync();
  } else {
    db.sequelize.sync();
  }
}

isAdminExist();
