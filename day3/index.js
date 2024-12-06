const { getFileContentAsString } = require("../utils/getFileContentAsString");

function extractNumberPairs(input) {
  const matches = [...input.matchAll(/mul\((\d+),(\d+)\)/g)];
  return matches.map((match) => [parseInt(match[1]), parseInt(match[2])]);
}

function extractValidMulPairs(input) {
  const matches = [
    ...input.matchAll(/(?:do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g),
  ];

  let isValid = true;
  const result = [];

  for (const match of matches) {
    if (match[0] === "don't()") {
      isValid = false;
    } else if (match[0] === "do()") {
      isValid = true;
    } else if (match[1] && match[2]) {
      if (isValid) {
        result.push([parseInt(match[1]), parseInt(match[2])]);
      }
    }
  }

  return result;
}

function mul(x, y) {
  return x * y;
}

async function main() {
  try {
    const text = await getFileContentAsString("input.txt");
    const numbersList = extractNumberPairs(text);

    // Part One
    const result = numbersList
      .map((el) => mul(el[0], el[1]))
      .reduce((acc, value) => acc + value, 0);

    console.log("Sum of results:", result);

    // Part Two
    const numbersList2 = extractValidMulPairs(
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    );

    const result2 = numbersList2
      .map((el) => mul(el[0], el[1]))
      .reduce((acc, value) => acc + value, 0);

    console.log("Part Two Result:", result2);
  } catch (error) {
    console.error(error);
  }
}

main();
