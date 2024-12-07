const { getLinesFromInput } = require("../utils/getLinesFromInput");

function verificar(m, a, s) {
  return m === "M" && a === "A" && s === "S";
}

function padraoXmasValido(mapa, linha, coluna) {
  // Verifica o padrão "MAS" na diagonal principal (cima para baixo)
  const diagonalPrincipalCima = verificar(
    mapa[linha][coluna],
    mapa[linha + 1][coluna + 1],
    mapa[linha + 2][coluna + 2]
  );

  // Verifica o padrão "MAS" na diagonal principal (baixo para cima)
  const diagonalPrincipalBaixo = verificar(
    mapa[linha + 2][coluna + 2],
    mapa[linha + 1][coluna + 1],
    mapa[linha][coluna]
  );

  // Verifica o padrão "MAS" na diagonal secundária (cima para baixo)
  const diagonalSecundariaCima = verificar(
    mapa[linha + 2][coluna],
    mapa[linha + 1][coluna + 1],
    mapa[linha][coluna + 2]
  );

  // Verifica o padrão "MAS" na diagonal secundária (baixo para cima)
  const diagonalSecundariaBaixo = verificar(
    mapa[linha][coluna + 2],
    mapa[linha + 1][coluna + 1],
    mapa[linha + 2][coluna]
  );

  // Combina as condições para validar a presença do padrão "XMAS"
  return (
    (diagonalPrincipalCima || diagonalPrincipalBaixo) &&
    (diagonalSecundariaCima || diagonalSecundariaBaixo)
  );
}

function contarPadroesXmas(mapa, totalLinhas, totalColunas) {
  let contador = 0;

  mapa.forEach((linha, i) => {
    if (i + 2 < totalLinhas) {
      linha.forEach((_, j) => {
        if (j + 2 < totalColunas && padraoXmasValido(mapa, i, j)) {
          contador++;
        }
      });
    }
  });

  return contador;
}

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

    // Part Two
    const mapa = rows.map((linha) => linha.split(""));

    const totalPadroesXMAS = contarPadroesXmas(
      mapa,
      rows.length,
      rows[0].length
    );

    console.log("Result:", totalPadroesXMAS);
  } catch (error) {
    console.error(error);
  }
}

main();
