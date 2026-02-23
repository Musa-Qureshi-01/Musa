const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/assets/Musa Qureshi _Agentic Developer_.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('resume_text.txt', data.text);
}).catch(err => {
    fs.writeFileSync('resume_text.txt', "Error: " + err.message);
});
