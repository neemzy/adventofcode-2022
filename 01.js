const fs = require("fs");
const data = fs.readFileSync("input_01.txt").toString();

/*const data = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;*/

const add = (acc, cur) => acc + parseInt(cur);

// Part 1
/*console.log(data
  .split("\n\n")
  .map(datum => datum.split("\n").reduce(add, 0))
  .sort((a, b) => a - b)
  .pop()
);*/

// Part 2
console.log(data
  .split("\n\n")
  .map(datum => datum.split("\n").reduce(add, 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(add, 0)
);
