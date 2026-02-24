const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/assets/Musa_Qureshi_AI_Engineer.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('resume_text.txt', data.text);
});
