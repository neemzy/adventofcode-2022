const fs = require("fs");
const data = fs.readFileSync("input_10.txt").toString();
//const data = fs.readFileSync("input_10_sample.txt").toString();

/*const data = `noop
addx 3
addx -5`;*/

// Part 1
/*console.log(data.split("\n").reduce((acc, instruction) => {
  acc.values.push(acc.values[acc.values.length - 1]);

  if ((acc.values.length + 20) % 40 === 0) {
    acc.sum += acc.values.length * acc.values[acc.values.length - 1];
  }

  if (instruction !== "noop") {
    acc.values.push(acc.values[acc.values.length - 1] + parseInt(instruction.split(" ").pop()));

    if ((acc.values.length + 20) % 40 === 0) {
      acc.sum += acc.values.length * acc.values[acc.values.length - 1];
    }
  }

  return acc;
}, {
  values: [1],
  sum: 0
}).sum);*/

// Part 2
const values = data.split("\n").reduce((acc, instruction) => {
  acc.push(acc[acc.length - 1]);

  if (instruction !== "noop") {
    acc.push(acc[acc.length - 1] + parseInt(instruction.split(" ").pop()));
  }

  return acc;
}, [1]);

const crt = [];

for (let i = 0; i < 240; i++) {
  if ([values[i] - 1, values[i], values[i] + 1].includes(i % 40)) {
    crt.push("#");
  } else {
    crt.push(".");
  }

  if ((i + 1) % 40 === 0) {
    crt.push("\n");
  }
}

console.log(crt.join(""));
