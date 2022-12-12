const fs = require("fs");
const data = fs.readFileSync("input_11.txt").toString();
//const data = fs.readFileSync("input_11_sample.txt").toString();

const monkeys = data.split("\n\n").map(monkey => {
  let [osef, items, operation, modulo, trueTarget, falseTarget] = monkey.match(/Monkey [0-9]+:\n  Starting items: ([0-9, ]+)\n  Operation: new = old ([old0-9+* ]+)\n  Test: divisible by ([0-9, ]+)\n    If true: throw to monkey ([0-9, ]+)\n    If false: throw to monkey ([0-9, ]+)/);
  items = items.split(", ").map(item => parseInt(item));
  modulo = parseInt(modulo);
  trueTarget = parseInt(trueTarget);
  falseTarget = parseInt(falseTarget);
  return {items, operation, modulo, trueTarget, falseTarget, count: 0};
});

// Part 1
/*for (let i = 0; i < 20; i++) {
  monkeys.forEach(monkey => {
    monkey.items.forEach(item => {
      item = eval(`${item} ${monkey.operation.replace("old", item)}`);
      item = Math.floor(item / 3);

      if (item % monkey.modulo === 0) {
        monkeys[monkey.trueTarget].items.push(item);
      } else {
        monkeys[monkey.falseTarget].items.push(item);
      }

      monkey.count++;
    });

    monkey.items = [];
  });
}

console.log(monkeys.map(({count}) => count)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((acc, cur) => acc * cur, 1)
);*/

const superModulo = monkeys.map(({modulo}) => modulo).reduce((acc, cur) => acc * cur, 1);

// Part 2
for (let i = 0; i < 10000; i++) {
  monkeys.forEach(monkey => {
    monkey.items.forEach(item => {
      item = eval(`${item} ${monkey.operation.replace("old", item)}`);
      item = item % superModulo; // I cheated lmao

      if (item % monkey.modulo === 0) {
        monkeys[monkey.trueTarget].items.push(item);
      } else {
        monkeys[monkey.falseTarget].items.push(item);
      }

      monkey.count++;
    });

    monkey.items = [];
  });
}

console.log(monkeys.map(({count}) => count)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((acc, cur) => acc * cur, 1)
);
