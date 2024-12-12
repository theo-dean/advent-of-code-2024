import * as fs from "node:fs";

const part1 = (left: number[], right: number[]) => {
  const leftSorted = left.sort();
  const rightSorted = right.sort();

  let sumDiff = 0;

  for (let i = 0; i < leftSorted.length; i++) {
    const diff = Math.abs(leftSorted[i] - rightSorted[i]);
    sumDiff += diff;
  }

  return sumDiff;
};

const part2 = (left: number[], right: number[]) => {
  const rightOccurrences = new Map<number, number>();
  right.forEach((item) => {
    const val = rightOccurrences.get(item);
    val ? rightOccurrences.set(item, val + 1) : rightOccurrences.set(item, 1);
  });

  return left.reduce(
    (acc, cur) => acc + (rightOccurrences.get(cur) ?? 0) * cur,
    0,
  );
};

function parseFileToArrays(filePath: string): {
  left: number[];
  right: number[];
} {
  const left: number[] = [];
  const right: number[] = [];

  const fileContent = fs.readFileSync(filePath, "utf-8");
  fileContent.split("\n").forEach((line) => {
    const [leftNum, rightNum] = line.split("   ").map(Number);
    left.push(leftNum);
    right.push(rightNum);
  });
  return { left, right };
}

const { left, right } = parseFileToArrays("./day1.txt");

console.log(part1(left, right));
console.log(part2(left, right));
