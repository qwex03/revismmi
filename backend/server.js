const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const { exec } = require('child_process');

const app = express();
const PORT = 3000;
app.use(cors());

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './docs'; // Changed from './uploads' to './docs'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Ajoute un timestamp pour éviter les conflits de noms
  }
});

const upload = multer({ storage: storage });

// Middleware pour servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'docs'))); // Changed from 'uploads' to 'docs'

// Route pour uploader un fichier
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier téléchargé' });
  }
  const { userId, categorieId } = req.body;
  res.status(200).json({
    message: 'Fichier téléchargé avec succès',
    file: {
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}` // Changed from 'uploads' to 'docs'
    },
    userId: userId,
    categorieId: categorieId,
  });

  // Execute main.mjs after upload
  exec('node main.mjs', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de main.mjs: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erreur: ${stderr}`);
      return;
    }
    console.log(`Sortie: ${stdout}`);
  });
  
});

// Route pour récupérer la liste des fichiers
app.get('/files', (req, res) => {
  const uploadDir = './docs'; // Changed from './uploads' to './docs'
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la lecture des fichiers' });
    }
    res.status(200).json({
      files: files.map(file => ({
        filename: file,
        path: `/uploads/${file}` // Changed from 'uploads' to 'docs'
      }))
    });
  });
});

// Route pour télécharger un fichier spécifique
app.get('/files/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'docs', req.params.filename); // Changed from 'uploads' to 'docs'
  res.download(filepath, err => {
    if (err) {
      res.status(404).json({ message: 'Fichier introuvable' });
    }
  });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Serveur en cours d'exécution sur http://0.0.0.0:${PORT}`);
});
