const fs = require("fs");

function getFileContentAsString(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Erro ao ler o arquivo: " + err);
        return;
      }

      resolve(data);
    });
  });
}

module.exports = { getFileContentAsString };
