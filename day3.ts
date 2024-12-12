import * as fs from "node:fs";

const sample =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const sample2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const data = fs.readFileSync("./day3.txt", "utf-8");

const part1 = (data: string) => {
  const regexp = /mul\((-?\d+),(-?\d+)\)/g;
  let sum = 0;
  let match;
  while ((match = regexp.exec(data)) !== null) {
    sum += parseInt(match[1]) * parseInt(match[2]);
  }
  return sum;
};

const part2 = (data: string) => {
  const regexp = /mul\((-?\d+),(-?\d+)\)|(do|don't)\(\)/g;
  let enabled = true;
  let sum = 0;
  let match;
  while ((match = regexp.exec(data)) !== null) {
    if (match[3] === "do") {
      enabled = true;
    } else if (match[3] === "don't") {
      enabled = false;
    } else if (enabled) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }
  }
  return sum;
};

console.log(part1(data));
console.log(part2(data));
