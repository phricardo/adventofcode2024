const fs = require("fs");

function getLinesFromInput(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Erro ao ler o arquivo: " + err);
        return;
      }

      const content = data.split("\n").map((row) => row.trim());

      resolve(content);
    });
  });
}

module.exports = { getLinesFromInput };
