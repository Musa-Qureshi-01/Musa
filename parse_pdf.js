import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('resume_text.txt', data.text);
}).catch(err => {
    fs.writeFileSync('resume_text.txt', "Error: " + err.message);
});
