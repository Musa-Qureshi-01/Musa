const PDFParser = require("pdf2json");
const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfParser.getRawTextContent());
});

pdfParser.loadPDF("dist/assets/Musa Qureshi _ Data Scientist.pdf");
