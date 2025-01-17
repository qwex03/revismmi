import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const uploadToDB = async (filePath) => {
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const response = await fetch('https://sae501.mateovallee.fr/cours', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload JSON: ${response.statusText}`);
  }

  const result = await response.json();
  console.log('Upload successful:', result);
  console.log(result);

  if (result !== null) {
    const docsDir = "docs/";
    fs.readdir(docsDir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(docsDir, file), err => {
          if (err) throw err;
        });
      }
    });
  }
};

export default uploadToDB;