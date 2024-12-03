const { getColumnLists } = require("../utils/getColumnLists");

function pairLists(list1, list2) {
  if (!Array.isArray(list1) || !Array.isArray(list2)) {
    throw new Error("Both inputs must be arrays.");
  }

  const sortedList1 = [...list1].sort((a, b) => a - b);
  const sortedList2 = [...list2].sort((a, b) => a - b);

  const pairs = sortedList1.map((num, index) => [num, sortedList2[index]]);

  return pairs;
}

function calculateDistances(pairs) {
  if (
    !Array.isArray(pairs) ||
    !pairs.every((pair) => Array.isArray(pair) && pair.length === 2)
  ) {
    throw new Error("Input must be an array of pairs.");
  }

  return pairs.map(([num1, num2]) => Math.abs(num1 - num2));
}

function sumDistances(distances) {
  if (!Array.isArray(distances) || !distances.every(Number.isFinite)) {
    throw new Error("Input must be an array of numbers.");
  }

  return distances.reduce((sum, distance) => sum + distance, 0);
}

function calculateSimilarityScore(listaEsquerda, listaDireita) {
  const result = [];

  listaEsquerda.forEach((elemento) => {
    const frequencia = listaDireita.filter((item) => item === elemento).length;
    const multipliedValue = elemento * frequencia;
    result.push(multipliedValue);
  });

  return result.reduce((acc, num) => acc + num, 0);
}

async function main() {
  try {
    const result = await getColumnLists("input.txt");

    // Part One //
    const column1 = result.column1;
    const column2 = result.column2;

    const pairs = pairLists(column1, column2);
    const distances = calculateDistances(pairs);
    const totalDistance = sumDistances(distances);

    console.log("Total Distance:", totalDistance);

    // Part Two //
    const similarityScore = calculateSimilarityScore(column1, column2);

    console.log("Similarity Score:", similarityScore);
  } catch (error) {
    console.error(error);
  }
}

main();
