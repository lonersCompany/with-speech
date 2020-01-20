var pdfUtil = require("pdf-to-text");
var pdf_path = "./book.pdf";

pdfUtil.info(pdf_path, function(err, info) {
  if (err) throw err;
});

