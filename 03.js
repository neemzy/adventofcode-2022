const fs = require("fs");
const data = fs.readFileSync("input_03.txt").toString();

/*const data = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;*/

function toPriority(item) {
  const charCode = item.charCodeAt(0);
  return charCode >= 97 ? charCode - 96 : charCode - 38;
}

// Part 1
/*console.log(data.split("\n").reduce((sum, line) => {
  const halfLength = Math.ceil(line.length / 2);
  const half1 = line.slice(0, halfLength).split("").map(toPriority);
  const half2 = line.slice(halfLength).split("").map(toPriority);
  const common = half2.find(item => half1.includes(item));
  return sum + common;
}, 0));*/

// Part 2
console.log(data.split("\n").reduce((groups, line) => {
  if ((groups.length === 0) || (groups[groups.length - 1].length === 3)) {
    groups.push([]);
  }

  groups[groups.length - 1].push(line.split(""));
  return groups;
}, []).reduce((sum, group) => {
  const badge = group[0].find(item => group[1].includes(item) && group[2].includes(item));
  return sum + toPriority(badge);
}, 0));
