import create_course from './create_course.mjs';
import { exec } from 'child_process';
import extractResult from './extractResult.mjs';
import path from 'path';
import fs from 'fs';
import uploadToDB from './upload_to_db.mjs';

const directoryPath = "docs/";

// Récupére userId depuis les arguments de la ligne de commande
const userId = process.argv[2];
const categorieId = process.argv[3];

// Vérifie si le fichier est un pdf, si non le convertit en pdf
const checkAndConvertFiles = async (file) => {
  const ext = path.extname(file);
  let newFilePath = file;

  await new Promise((resolve, reject) => {
    exec(`python convert_file.py ${file} ${ext}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting file ${file}:`, stderr);
        reject(error);
      } else {
        console.log(`Converted file ${file}:`, stdout);
        resolve();
      }
    });
  });
  
  newFilePath = path.join(path.dirname(file), path.basename(file, ext) + '.pdf');

  return newFilePath;
};

// Convertit une image en cours
const courseFromImage = async (filePath, ext) => {
  const outputFilePath = path.join(directoryPath, path.basename(filePath, ext) + '.md');

  return new Promise((resolve, reject) => {
    exec(`python analyzeImage.py ${filePath} ${outputFilePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Script error: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(`Script output: ${stdout}`);
      resolve(outputFilePath);
    });
  });
};

//Récupère le fichier uploadé et crée le cours
function main () {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error(`Unable to scan directory: ${err}`);
    }
    if (files.length > 0) {
      const file = files[0];
      const filePath = path.join(directoryPath, file);
      const ext = path.extname(filePath);
      const outputFilePath = path.join(directoryPath, path.basename(filePath, ext) + '.md');
      console.log("outputFilePath: "+outputFilePath);
      console.log("filePath: "+filePath);
      if (ext !== '.pdf' && ext !== '.png' && ext !== '.jpg') {

        // Cas où l'input est un fichier texte
        checkAndConvertFiles(filePath)
        .then((filePath) => create_course([filePath]))
        .then(() => {
          extractResult(outputFilePath, userId, categorieId);
        })
        .catch((error) => {
          console.error("Erreur lors de la création du cours :", error);
        });
          
      } else if (ext === '.jpg' || ext === '.png') {

        // Cas où l'input est une image
        courseFromImage(filePath, ext)
          .then(() => {
            extractResult(outputFilePath, userId, categorieId);
          })
          .catch(console.error);
      }
    } else {
      console.log('No files found in the directory.');
    }
  });
}

main();