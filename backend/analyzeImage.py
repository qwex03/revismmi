import argparse
import base64
from openai import OpenAI

api_key = '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'

client = OpenAI(api_key=api_key)

parser = argparse.ArgumentParser()
parser.add_argument("input_file", help="Path to the input image file")
parser.add_argument("output_file", help="Path to the output Markdown file")
args = parser.parse_args()

with open(args.input_file, "rb") as image_file:
    base64_image = base64.b64encode(image_file.read()).decode('utf-8')

prompt = """
    # Context:
    Création d'un résumé à partir d'une image en entrée pour faciliter la révision.
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
    2. Dans le résumé, les formules doivent être encadrées par des balises nécessaires (par exemple, \`\( \\)\` pour inline ou \`\\[ \\]\` pour block).
    3. Dans le JSON (champs \`question\` et \`reponse\`), toutes les formules mathématiques doivent obligatoirement être encadrées par les balises `\( \)\` ou `\[ \]`, même si elles apparaissent au milieu du texte. Si une formule mathématique est déjà en LaTeX, ajoute simplement les balises nécessaires.

    Si tu ne trouves le document PDF ou que tu n'arrives pas à le lire, renvoie le message d'erreur suivant : "Erreur lecture".

    # Output:
    L'output sera composée de 3 parties : Titre, Résumé et Cartes.
    Titre sera le titre du cours et entouré de balises \`\`\`title\`\`\`, de cette façon :
    \`\`\`title
    Titre du cours
    \`\`\`
    Résumé sera en format Markdown et entouré de balises \`\`\`markdown\`\`\`, de cette façon :
    \`\`\`markdown
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    \`\`\`
    Le résumé commencera avec un titre et ne comportera pas de commentaires et fera au moins ${lengthResume} mots.
    Cartes sera en format JSON et entouré de balises \`\`\`JSON\`\`\`, de cette façon :
    \`\`\`JSON
    {
    ...
    }
    \`\`\`

    Il faudra exactement ${nbCarteQCM} cartes de type qcm et ${nbCarteFlashcard} de type flashcard dans le quizz. En t'assurant que les questions soient variées et couvrent l'ensemble du document.
    En dehors des balises, il ne doit pas y avoir de commentaires, ni au début ni à la fin de la réponse.

    Les formules mathématiques doivent être encadrées de manière standard pour être reconnaissables en LaTeX.
    Voici un exemple du format attendu :
    \`\`\`title
    Titre du cours
    \`\`\`
    \`\`\`markdown
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    \`\`\`
    \`\`\`JSON
    {
      "question": "Quel est le ratio d'efficacité pour 2016 entre \( J/ψπ \) et \( J/ψK \) ?",
      "reponses": [
        { "reponse": "\( 0.935 \pm 0.004 \)", "correcte": false },
        { "reponse": "\( 0.936 \pm 0.004 \)", "correcte": true },
        { "reponse": "\( 0.953 \pm 0.005 \)", "correcte": false },
        { "reponse": "\( 0.900 \pm 0.002 \)", "correcte": false }
      ],
      "type": "qcm"
      },
      {
      "question": "Formule pour la différence d'asymétrie CP ?",
      "reponses": [
        { "reponse": "\( \Delta A_{CP} = (A_{raw}^{J/ψπ} - A_{raw}^{J/ψK}) \)", "correcte": false },
        { "reponse": "\( \Delta A_{CP} = (A_{det}^{J/ψπ} - A_{det}^{J/ψK}) \)", "correcte": false },
        { "reponse": "\( \Delta A_{CP} = (A_{raw}^{J/ψπ} - A_{raw}^{J/ψK}) - (A_{det}^{J/ψπ} - A_{det}^{J/ψK}) \)", "correcte": true },
        { "reponse": "\( \Delta A_{CP} = (A_{pid}^{J/ψπ} - A_{pid}^{J/ψK}) \)", "correcte": false }
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
    """

def call_api_with_retry(base64_image, output_file, retry_count=3):
    for attempt in range(retry_count):
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt,
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
        )

        # Extraction du contenu du message
        content = response.choices[0].message.content

        if "Erreur lecture" in content:
            print("Erreur lecture du document, nouvel essai...")
            continue
        else:
            # Sauvegarde du contenu dans un fichier Markdown
            with open(output_file, "w", encoding="utf-8") as md_file:
                md_file.write(content)
            print(f"The content has been saved to {output_file}")
            return

    raise Exception("Erreur lecture du document après plusieurs tentatives")

call_api_with_retry(base64_image, args.output_file)