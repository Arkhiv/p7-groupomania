const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Utilisation du Headers 'Authorization' + Split autour de l'espace pour récupérer le token(2eme élément du tableau renvoyé)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN');
    // Décoder le token avec jwt et Verify avec la clé secrete 'RANDOM_TOKEN';
    const { userId } = decodedToken;
    // Le token devient un objet JS, récupération du userId
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('userId non valable !');
      // Si la demande contient un ID utilisateur, compare à celui extrait du token. Si différents,génére une erreur ;
    } else {
      next();
    }
  } catch (e) {
    res.status(403).json({
      error: new Error('unauthorized request'),
    });
  }
};
