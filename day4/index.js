const { getLinesFromInput } = require("../utils/getLinesFromInput");

function searchDirection(x, y, dx, dy, rows, word, wordLength) {
  let matched = true;
  for (let i = 0; i < wordLength; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (
      nx < 0 ||
      ny < 0 ||
      nx >= rows.length ||
      ny >= rows[0].length ||
      rows[nx][ny] !== word[i]
    ) {
      matched = false;
      break;
    }
  }
  return matched;
}

// Função para percorrer o grid e contar as ocorrências da palavra
function countWordInGrid(rows, word, wordLength) {
  let count = 0;

  // Percorrer cada célula do grid
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[0].length; y++) {
      if (searchDirection(x, y, 1, 0, rows, word, wordLength)) count++; // Direção para a direita (horizontal)
      if (searchDirection(x, y, -1, 0, rows, word, wordLength)) count++; // Direção para a esquerda (horizontal)
      if (searchDirection(x, y, 0, 1, rows, word, wordLength)) count++; // Direção para baixo (vertical)
      if (searchDirection(x, y, 0, -1, rows, word, wordLength)) count++; // Direção para cima (vertical)
      if (searchDirection(x, y, 1, 1, rows, word, wordLength)) count++; // Direção diagonal inferior direita
      if (searchDirection(x, y, 1, -1, rows, word, wordLength)) count++; // Direção diagonal superior direita
      if (searchDirection(x, y, -1, 1, rows, word, wordLength)) count++; // Direção diagonal inferior esquerda
      if (searchDirection(x, y, -1, -1, rows, word, wordLength)) count++; // Direção diagonal superior esquerda
    }
  }

  return count;
}

async function main() {
  try {
    const rows = await getLinesFromInput("input.txt");

    // Part One
    const word = "XMAS";
    const wordLength = word.length;
    let count = countWordInGrid(rows, word, wordLength);

    console.log(`A palavra "${word}" aparece ${count} vezes no grid.`);
  } catch (error) {
    console.error(error);
  }
}

main();
