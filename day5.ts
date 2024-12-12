import * as fs from "node:fs";

const sampleData =
    "47|53\n" +
    "97|13\n" +
    "97|61\n" +
    "97|47\n" +
    "75|29\n" +
    "61|13\n" +
    "75|53\n" +
    "29|13\n" +
    "97|29\n" +
    "53|29\n" +
    "61|53\n" +
    "97|53\n" +
    "61|29\n" +
    "47|13\n" +
    "75|47\n" +
    "97|75\n" +
    "47|61\n" +
    "75|61\n" +
    "47|29\n" +
    "75|13\n" +
    "53|13\n" +
    "\n" +
    "75,47,61,53,29\n" +
    "97,61,53,29,13\n" +
    "75,29,13\n" +
    "75,97,47,61,53\n" +
    "61,13,29\n" +
    "97,13,75,29,47"

const data = fs.readFileSync("./data/day5.txt", "utf-8");

const rawDataToRulesandUpdates = (rawData: string): {rules: Map<number, number[]>, updates: number[][]} => {
    const lines = rawData.split("\n");
    const splitIndex = lines.findIndex(s => s === "");

    const rules = new Map<number, number[]>();
    lines.slice(0, splitIndex).forEach(rs => {
        const [key, target] = rs.split("|").map(Number);
        const curr = rules.get(key) ?? [];
        rules.set(key, [...curr, target]);
    });

    const updates = lines.slice(splitIndex+1, lines.length).map(l => l.split(",").map(Number));

    return {
        rules, updates
    }
};

const isValidUpdate = (update: number[], rules: Map<number, number[]>): boolean => {
    for (let i = 1; i < update.length; i++) {
        const rule = rules.get(update[i]);
        if (rule && update.slice(0, i).some(v => rule.includes(v))) return false;
    }
    return true;
}

const part1 = (data: string): number => {
    const {rules, updates} = rawDataToRulesandUpdates(data);
    return updates.filter(u => isValidUpdate(u, rules)).map(u => u[Math.floor(u.length/2)]).reduce((a, b) => a + b);
}

console.log(part1(data));