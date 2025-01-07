const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors')

const app = express();
const PORT = 3000;
app.use(cors());

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route pour uploader un fichier
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier téléchargé' });
  }
  res.status(200).json({
    message: 'Fichier téléchargé avec succès',
    file: {
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    }
  });
});

// Route pour récupérer la liste des fichiers
app.get('/files', (req, res) => {
  const uploadDir = './uploads';
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la lecture des fichiers' });
    }
    res.status(200).json({
      files: files.map(file => ({
        filename: file,
        path: `/uploads/${file}`
      }))
    });
  });
});

// Route pour télécharger un fichier spécifique
app.get('/files/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filepath, err => {
    if (err) {
      res.status(404).json({ message: 'Fichier introuvable' });
    }
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
