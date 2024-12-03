const fs = require("fs");

function getColumnLists(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Erro ao ler o arquivo: " + err);
        return;
      }

      const lines = data.trim().split("\n");

      const column1 = [];
      const column2 = [];

      lines.forEach((line) => {
        const [num1, num2] = line.trim().split(/\s+/).map(Number);
        column1.push(num1);
        column2.push(num2);
      });

      resolve({
        column1,
        column2,
      });
    });
  });
}

// Export the function in CommonJS format
module.exports = { getColumnLists };
