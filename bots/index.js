var pdfUtil = require("pdf-to-text");
var pdf_path = "./book.pdf";

pdfUtil.info(pdf_path, function(err, info) {
  if (err) throw err;
  console.log(info);
});

//option to extract text from page 0 to 10
// var option = { from: 0, to: 10 };

// pdfUtil.pdfToText(upload.path, option, function(err, data) {
//   if (err) throw err;
//   console.log(data); //print text
// });
