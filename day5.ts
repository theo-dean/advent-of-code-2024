const sampleData = "47|53\n" +
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

const rawDataToRulesandUpdates = (rawData: string): {rules: Map<string, string[]>, updates: string[]} => {
    const lines = rawData.split("\n");
    const rules = new Map<string, string[]>();
    lines.slice(0, lines.findIndex(s => s === "")).forEach(rs => {
        const key = rs.split("|")[0];
        const target = rs.split("|")[1];
        if (rules.has(key)){
            const curr = rules.get(key);
            rules.set(key, curr.concat([target]));
        } else {
            rules.set(key, [target]);
        }
    });
    const updates = lines.slice(lines.findIndex(s => s === "")+1, lines.length);

    return {
        rules, updates
    }
};

console.log(rawDataToRulesandUpdates(sampleData))