import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: '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',
});

//Paramètres
const nbCarteQCM = 10;
const nbCarteFlashcard = 5;
const lengthResume = 2000;

//Prompt
const prompt = `
      # Context:
      Création d'un résumé à partir d'un document pdf en entrée pour faciliter la révision.
      Création de cartes de quizz pour faciliter la mémorisation des informations importantes du document.

      # Task:
      Fait un résumé détaillé de ce document pour des révisions. Fait bien attention aux formules mathématiques. Avant d'écrire le résumé, utilise tes connaissances pour vérifier la véracité et l'exactitude des propos énoncés. Le résumé doit être d'au moins ${lengthResume} mots.
      Tu devras aussi créer du contenu pour des cartes de quizz. Il existe 2 types de cartes : qcm et flashcard.
      Une carte qcm est composée soit :
        - 1 question et 4 réponses dont une bonne
        - 1 question et 4 réponses dont plusieurs bonnes
        - 1 question et 2 réponses (Vrai et Faux) dont une est la bonne
      Une carte flashcard est composée :
        - 1 question (recto de la flashcard)
        - 1 (et une seule) réponse (verso de la flashcard)
        - La question et la réponse sont interchangeables selon le principe d'une flashcard : On lit un côté et on doit trouver l'autre côté. Le champ question ne contient donc pas une question mais une affirmation, et le champ réponse contient la réponse à cette affirmation.
        -une flashcard ne peut pas contenir plus d'une question ou d'une réponse.
      Les questions du quizz doivent pouvoir être répondues de tête, sans avoir besoin d'écrire.
      Le résumé et les cartes doivent être en français, sauf pour les termes techniques qui peuvent rester en anglais.

      Les questions et réponses doivent être formatées correctement pour respecter les standards suivants :
      1. Les formules mathématiques doivent être écrites en LaTeX.
      2. Dans le résumé, les formules doivent être encadrées par des balises nécessaires (par exemple, \`\\( \\)\` pour inline ou \`\\[ \\]\` pour block).
      3. Dans le JSON (champs \`question\` et \`reponse\`), toutes les formules mathématiques doivent obligatoirement être encadrées par les balises \`\\( \\)\` ou \`\\[ \\]\`, même si elles apparaissent au milieu du texte. Si une formule mathématique est déjà en LaTeX, ajoute simplement les balises nécessaires.

      Si tu ne trouves le document PDF ou que tu n'arrives pas à le lire, renvoie le message d'erreur suivant : "Erreur lecture".

      # Output:
      L'output sera composée de 3 parties : Titre, Résumé et Cartes.
      Titre sera le titre du cours et entouré de balises \`\`\`title\`\`\`.
      Résumé sera en format Markdown et entouré de balises \`\`\`markdown\`\`\`.
      Le résumé commencera avec un titre qui sera le nom du cours et ne comportera pas de commentaires et fera au moins ${lengthResume} mots.
      Cartes sera en format JSON et entouré de balises \`\`\`JSON\`\`\`.
      N'oublie pas de fermer les balises de code pour chaque partie.

      Il faudra exactement ${nbCarteQCM} cartes de type qcm et ${nbCarteFlashcard} de type flashcard dans le quizz. En t'assurant que les questions soient variées et couvrent l'ensemble du document.
      En dehors des balises, il ne doit pas y avoir de commentaires, ni au début ni à la fin de la réponse.

      Les formules mathématiques doivent être encadrées de manière standard pour être reconnaissables en LaTeX. Voici un exemple du format attendu :
      \`\`\`title
      Titre du cours
      \`\`\`
      \`\`\`markdown
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      \`\`\`
      \`\`\`JSON
      {
      "question": "Quel est le ratio d'efficacité pour 2016 entre \\( J/ψπ \\) et \\( J/ψK \\) ?",
      "reponses": [
        { "reponse": "\\( 0.935 \\pm 0.004 \\)", "correcte": false },
        { "reponse": "\\( 0.936 \\pm 0.004 \\)", "correcte": true },
        { "reponse": "\\( 0.953 \\pm 0.005 \\)", "correcte": false },
        { "reponse": "\\( 0.900 \\pm 0.002 \\)", "correcte": false }
      ],
      "type": "qcm"
      },
      {
      "question": "Formule pour la différence d'asymétrie CP ?",
      "reponses": [
        { "reponse": "\\( \\Delta A_{CP} = (A_{raw}^{J/ψπ} - A_{raw}^{J/ψK}) \\)", correcte: false },
        { "reponse": "\\( \\Delta A_{CP} = (A_{det}^{J/ψπ} - A_{det}^{J/ψK}) \\)", correcte: false },
        { "reponse": "\\( \\Delta A_{CP} = (A_{raw}^{J/ψπ} - A_{raw}^{J/ψK}) - (A_{det}^{J/ψπ} - A_{det}^{J/ψK}) \\)", "correcte": true },
        { "reponse": "\\( \\Delta A_{CP} = (A_{pid}^{J/ψπ} - A_{pid}^{J/ψK}) \\)", correcte: false }
      ],
      "type": "qcm"
      },
      {
        "question": "example de question Vrai/Faux",
        "reponses": [
          { "reponse": "Vrai", "correcte": true },
          { "reponse": "Faux", "correcte": false }
        ],
        "type": "qcm"
      },
      {
        "question": "example de recto de flashcard",
        "reponses": [
          { "reponse": "exemple de verso de flashcard", "correcte": true }
        ],
        "type": "flashcard"
      },
      {
        "question": "example de recto de flashcard",
        "reponses": [
          { "reponse": "exemple de verso de flashcard", "correcte": true }
        ],
        "type": "flashcard"
      }
      \`\`\`
    `;

const assistant = await openai.beta.assistants.retrieve(
    "asst_vqVsEpxa5rXiL3GTACrvGXVM"
  );

async function callApi(filesToUpload) {
  const newFilePath = path.join(path.dirname(filesToUpload[0]), path.basename(filesToUpload[0], path.extname(filesToUpload[0])) + '.md');
  console.log(newFilePath);

  // Stocker les IDs des fichiers après leur envoi
  const uploadedFiles = [];

  for (const filePath of filesToUpload) {
    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });
    uploadedFiles.push(file.id);
  }

  // Attachez tous les fichiers à la demande
  const attachments = uploadedFiles.map((file_id) => ({
    file_id,
    tools: [{ type: "file_search" }],
  }));

  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: prompt,
        attachments,
      },
    ],
  });

  return new Promise((resolve, reject) => {
    // Traiter la réponse de l'assistant
    const stream = openai.beta.threads.runs
    .stream(thread.id, {
      assistant_id: assistant.id,
    })
    .on("textCreated", () => console.log("assistant >"))
    .on("toolCallCreated", (event) => console.log("assistant " + event.type))
    .on("messageDone", async (event) => {
      if (event.content[0].type === "text") {
        const { text } = event.content[0];
        // Vérifier si le texte contient une erreur de lecture et réessayer la lecture
        if (text.value === "Erreur lecture." || text.value === "Erreur lecture") {
          console.log("Erreur lecture du document, nouvel essai...");
          await callApi(filesToUpload);
          reject(new Error("Erreur lecture du document"));
        } else {
          const textToWrite = `${text.value}`;
          fs.writeFile(newFilePath, textToWrite, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                reject(err);
            } else {
                console.log('File written successfully:', newFilePath);
                resolve();
            }
          });
        }
      }
    });
  });
}

async function create_course(filesToUpload) {
  try {
    await callApi(filesToUpload);
    console.log("Markdown file created successfully.");
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
  }
}

export default create_course;