const fs = require("fs");
const data = fs.readFileSync("input_05.txt").toString();

/*const data = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;*/

const [crateRows, moves] = data.split("\n\n").map(datum => datum.split("\n"));

const indexes = crateRows.pop().split("").reduce((acc, cur, index) => {
  if (cur !== " ") {
    acc.push(index);
  }

  return acc;
}, []);

const crateColumns = crateRows.reverse().reduce((crateColumns, crateRow) => {
  indexes.forEach((index, actualIndex) => {
    if (crateRow[index].match(/[A-Z]/)) {
      if (!crateColumns[actualIndex]) {
        crateColumns[actualIndex] = [];
      }
      crateColumns[actualIndex].push(crateRow[index]);
    }
  });

  return crateColumns;
}, []);

// Part 1
/*moves.forEach(move => {
  let [count, from, to] = move.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/).slice(1);
  from--;
  to--;

  while (count > 0) {
    const fromLastIndex = crateColumns[from].length - 1;
    crateColumns[to].push(crateColumns[from][fromLastIndex]);
    crateColumns[from] = crateColumns[from].slice(0, fromLastIndex);
    count--;
  }
});*/

// Part 2
moves.forEach(move => {
  let [count, from, to] = move.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/).slice(1);
  from--;
  to--;

  crateColumns[to] = [...crateColumns[to], ...crateColumns[from].slice(-count)];
  crateColumns[from] = crateColumns[from].slice(0, -count);
});

// Result
console.log(crateColumns.map(crateColumn => crateColumn[crateColumn.length - 1]).join(""));
