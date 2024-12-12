import * as fs from "node:fs";

const rawSample1 =
  "MMMSXXMASM\n" +
  "MSAMXMSMSA\n" +
  "AMXSXMAAMM\n" +
  "MSAMASMSMX\n" +
  "XMASAMXAMM\n" +
  "XXAMMXXAMA\n" +
  "SMSMSASXSS\n" +
  "SAXAMASAAA\n" +
  "MAMMMXMMMM\n" +
  "MXMXAXMASX";

const sample1 = rawSample1.split("\n").map((r) => r.split(""));

const rawSample2 =
  ".M.S......\n" +
  "..A..MSMS.\n" +
  ".M.S.MAA..\n" +
  "..A.ASMSM.\n" +
  ".M.S.M....\n" +
  "..........\n" +
  "S.S.S.S.S.\n" +
  ".A.A.A.A..\n" +
  "M.M.M.M.M.\n" +
  "..........";

const sample2 = rawSample2.split("\n").map((r) => r.split(""));

const data = fs
  .readFileSync("./data/day4.txt", "utf-8")
  .split("\n")
  .map((r) => r.split(""));

function wordSearch(board: string[][], word: string): number {
  let count = 0;
  const rows = board.length;
  const cols = board[0].length;
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
    [1, 1], // Down-Right
    [1, -1], // Down-Left
    [-1, 1], // Up-Right
    [-1, -1], // Up-Left
  ];

  const search = (x, y, pos, direction, word): boolean => {
    if (x < 0 || y < 0 || x >= rows || y >= cols) return false; //Out of Bounds

    if (board[x][y] === word[pos]) {
      if (pos === word.length - 1) {
        return true;
      } else {
        return search(
          x + direction[0],
          y + direction[1],
          pos + 1,
          direction,
          word,
        );
      }
    } else {
      return false;
    }
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (let direction of directions) {
        if (search(row, col, 0, direction, word)) {
          count++;
        }
      }
    }
  }

  return count;
}

const crossSearch = (board: string[][]): number => {
  let count = 0;
  const rows = board.length;
  const cols = board[0].length;

  const isOutOfBounds = (x, y): boolean => {
    return x < 0 || y < 0 || x >= rows || y >= cols;
  };

  const isMas = (x, y): boolean => {
    const first = [board[x - 1][y - 1], board[x + 1][y + 1]];
    const second = [board[x - 1][y + 1], board[x + 1][y - 1]];
    function isValidArray(arr) {
      return JSON.stringify(arr.sort()) === JSON.stringify(["M", "S"]);
    }

    return isValidArray(first) && isValidArray(second);
  };

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (board[row][col] === "A") {
        if (isMas(row, col)) count++;
      }
    }
  }
  return count;
};

const part1 = (data) => {
  const word = "XMAS";
  return wordSearch(data, word);
};

const part2 = (data) => {
  return crossSearch(data);
};

console.log(part1(data));
console.log(part2(data));
