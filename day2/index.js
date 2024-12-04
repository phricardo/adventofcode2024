const { getRowLists } = require("../utils/getRowLists");

function isSafeReport(report) {
  const maxIncreaseAllowed = 3;

  const isIncreasing = report.every(
    (val, idx) => idx === 0 || val > report[idx - 1]
  );

  const isDecreasing = report.every(
    (val, idx) => idx === 0 || val < report[idx - 1]
  );

  if (!isIncreasing && !isDecreasing) return false;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1];
    const isDifferenceExceeds = Math.abs(diff) > maxIncreaseAllowed;

    const previousElement = report[i - 1];
    const currentElement = report[i];
    const nextElement = report[i + 1];

    const hasDecreased = previousElement && currentElement < previousElement;
    const hasIncreased = nextElement && nextElement > currentElement;

    if (isDifferenceExceeds) return false;
    if (hasDecreased && hasIncreased) return false;
  }

  return true;
}

function checkSafeReportProblemDampene(report) {
  if (isSafeReport(report)) return true;

  const canBeMadeSafe = report.some((_, index) => {
    const modifiedReport = report
      .slice(0, index)
      .concat(report.slice(index + 1));
    return isSafeReport(modifiedReport);
  });

  return canBeMadeSafe;
}

async function main() {
  try {
    const input = await getRowLists("input.txt");
    const reports = input.rows;

    const safeReports = reports.filter((report) => isSafeReport(report));
    console.log("Part One:", safeReports.length);

    const safeReportsProblemDampene = reports.filter((report) =>
      checkSafeReportProblemDampene(report)
    );

    console.log("Part Two:", safeReportsProblemDampene.length);
  } catch (error) {
    console.error(error);
  }
}

main();
