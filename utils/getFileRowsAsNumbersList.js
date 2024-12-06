const fs = require("fs");

function getFileRowsAsNumbersList(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Erro ao ler o arquivo: " + err);
        return;
      }

      const lines = data.trim().split("\n");

      const rows = [];

      lines.forEach((line) => {
        const row = line.trim().split(/\s+/).map(Number);
        rows.push(row);
      });

      resolve(rows);
    });
  });
}

module.exports = { getFileRowsAsNumbersList };
