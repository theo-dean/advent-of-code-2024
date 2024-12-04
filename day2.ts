import * as fs from "node:fs";

const getReportData = (filePath: string) => {
    return fs.readFileSync(filePath, 'utf-8').split("\n").map(r => r.split(" ").map(Number));
}

const sample =
    "7 6 4 2 1\n" +
    "1 2 7 8 9\n" +
    "9 7 6 2 1\n" +
    "1 3 2 4 5\n" +
    "8 6 4 4 1\n" +
    "1 3 6 7 9"

const sampleReports = sample.split("\n").map(r => r.split(" ").map(Number));

const isSafe = (levels: number[]): boolean => {
    for (let i=1; i<levels.length; i++) {
        if (
            ((levels[i-1] < levels[i]) != levels[0] < levels[1]) ||
            Math.abs(levels[i-1] - levels[i]) < 1 ||
            Math.abs(levels[i-1] - levels[i]) > 3
        ) {
            return false;
        }
    }
    return true;
}

const part1 = (reports: number[][]) => {
    return reports.filter(isSafe).length;
};

const part2 = (reports: number[][]) => {
    return reports.filter(r =>
        isSafe(r) ||
        r.some((_, i) => isSafe(r.slice(0, i).concat(r.slice(i + 1))))
    ).length;
}

const data = getReportData("./day2.txt");
console.log(part1(data));
console.log(part2(data));