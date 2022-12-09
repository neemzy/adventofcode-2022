const fs = require("fs");
const data = fs.readFileSync("input_04.txt").toString();

/*const data = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;*/

// Part 1
/*console.log(data.split("\n").reduce((count, line) => {
  const [start1, end1, start2, end2] = line.split(",")
    .reduce((acc, range) => [...acc, ...range.split("-").map(n => parseInt(n))], []);

  if ((start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1)) {
    count++;
  }

  return count;
}, 0));*/

// Part 2
console.log(data.split("\n").reduce((count, line) => {
  const [start1, end1, start2, end2] = line.split(",")
    .reduce((acc, range) => [...acc, ...range.split("-").map(n => parseInt(n))], []);

  if ((start1 <= start2 && start2 <= end1) || (start2 <= start1 && start1 <= end2)) {
    count++;
  }

  return count;
}, 0));
