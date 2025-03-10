const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');  // Importer les routes d'authentification
const jwt = require('jsonwebtoken');  // Gardez cette ligne et supprimez l'autre ligne similaire
require('dotenv').config();
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');
require('dotenv').config();











// Configuration du serveur
const PORT = process.env.PORT || 3000; // Utilisation du port défini dans les variables d'environnement ou par défaut 5000

const corsOptions = {
  origin: ['https://celadon-beijinho-e9e946.netlify.app', 'https://cvs-app.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions)); 
app.use(express.json());

app.use('/uploads/pdfs', express.static(path.join(__dirname, 'uploads','pdfs')));


// Utilisation des routes d'authentification
app.use('/api/users', authRoutes);  // Route pour la gestion des utilisateurs (inscription, connexion)

console.log('Routes configurées pour /api/users');

require('dotenv').config();  // Charge les variables d'environnement

const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:VRejDTZtIqhMNUnuJoAlEqYAeELHURki@shuttle.proxy.rlwy.net:28774';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((err) => {
    console.log(' Erreur de connexion à MongoDB :', err);
  });
 
  
// Middleware de logs pour les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hammouguaassiya@gmail.com', // Remplacez par votre email Gmail
    pass: 'vdwb omxo cjok jytc', // Mot de passe d'application
  },
});

// Endpoint pour envoyer des emails
app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;

  // Définir les options de l'email
  const mailOptions = {
    from: 'hammouguaassiya@gmail.com', // Adresse de l'expéditeur
    to, // Adresse du destinataire
    subject, // Sujet de l'email
    text: message, // Contenu de l'email
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi:', error);
      return res.status(500).send('Erreur lors de l\'envoi');
    }
    console.log('Email envoyé:', info.response);
    res.status(200).send('Email envoyé avec succès!');
  });
});
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


