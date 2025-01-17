import fs from 'fs';
import { marked } from 'marked';
import uploadToDB from './upload_to_db.mjs';

function extractContent(content) {
    const titleRegex = /```(?:\s*title|\s*"title"\s*)[\s\S]*?```/;
    const markdownRegex = /```(?:\s*markdown|\s*"markdown"\s*)[\s\S]*?```/;
    const jsonRegex = /```(?:\s*JSON|\s*"JSON"\s*)[\s\S]*?```/;

    const titleMatch = content.match(titleRegex);
    const markdownMatch = content.match(markdownRegex);
    const jsonMatch = content.match(jsonRegex);

    const title = titleMatch ? titleMatch[0].replace(/```(?:\s*title|\s*"title"\s*)|```/g, '').trim() : '';
    const resume = markdownMatch ? markdownMatch[0].replace(/```(?:\s*markdown|\s*"markdown"\s*)|```/g, '').trim() : '';
    let quizz = jsonMatch ? jsonMatch[0].replace(/```(?:\s*JSON|\s*"JSON"\s*)|```/g, '').trim() : '';
    if (quizz.startsWith('[') && quizz.endsWith(']')) {
      quizz = quizz.slice(1, -1).trim();
    }
    // Escape backslashes
    quizz = quizz.replace(/\\/g, '\\\\');
    console.log("quizz : "+quizz);
    return { title, resume, quizz };
}

function convertMarkdownToJson(markdown) {
    const html = marked(markdown);
    const json = JSON.stringify({ content: html });
    return json;
}

function convertJsonToMarkdown(json) {
    const obj = JSON.parse(json);
    const markdown = obj.content;
    return markdown;
}

function extractResult(filePath, userId, categorieId) {
    console.log("extractResult filePath : "+filePath);
    const inputContent = fs.readFileSync(filePath, 'utf8');
    const { title, resume, quizz } = extractContent(inputContent);
    const resumeJson = JSON.stringify(resume);

    const quizzJson = JSON.parse(`[${quizz}]`);

    // Create the final JSON object
    const result = {
        nom : title,
        id_createur: userId,
        id_categorie: categorieId,
        resume: resumeJson,
        cartes: quizzJson
    };

    // Write the result to a new JSON file
    fs.writeFileSync('docs/output.json', JSON.stringify(result, null, 2), 'utf8');
    console.log('Output JSON file created:', result);
    uploadToDB('docs/output.json');
}

export default extractResult;