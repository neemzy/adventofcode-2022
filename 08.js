const fs = require("fs");
const data = fs.readFileSync("input_08.txt").toString();

/*const data = `30373
25512
65332
33549
35390`;*/

const grid = data.split("\n").map(datum => datum.split(""));

// Part 1
/*console.log(grid.reduce((sum, row, y) => {
  row.forEach((tree, x) => {
    if (x === 0 || x === row.length - 1 || y === 0 || y === grid.length - 1) {
      sum++;
      return;
    }

    const leftTrees = row.slice(0, x);

    if (!leftTrees.find(otherTree => otherTree >= tree)) {
      sum++;
      return;
    }

    const rightTrees = row.slice(x + 1);

    if (!rightTrees.find(otherTree => otherTree >= tree)) {
      sum++;
      return;
    }

    const topTrees = grid.slice(0, y).map(row => row[x]);

    if (!topTrees.find(otherTree => otherTree >= tree)) {
      sum++;
      return;
    }

    const bottomTrees = grid.slice(y + 1).map(row => row[x]);

    if (!bottomTrees.find(otherTree => otherTree >= tree)) {
      sum++;
    }
  });

  return sum;
}, 0));*/

// Part 2
console.log(grid.reduce((scenicScore, row, y) => {
  row.forEach((tree, x) => {
    // "If a tree is right on the edge, at least one of its viewing distances will be zero."
    if (x === 0 || x === row.length - 1 || y === 0 || y === grid.length - 1) {
      return;
    }

    const leftTrees = row.slice(0, x);
    let leftViewingDistance = leftTrees.reverse().findIndex(otherTree => otherTree >= tree);
    leftViewingDistance = leftViewingDistance === -1 ? leftTrees.length : leftViewingDistance + 1;

    const rightTrees = row.slice(x + 1);
    let rightViewingDistance = rightTrees.findIndex(otherTree => otherTree >= tree);
    rightViewingDistance = rightViewingDistance === -1 ? rightTrees.length : rightViewingDistance + 1;

    const topTrees = grid.slice(0, y).map(row => row[x]);
    let topViewingDistance = topTrees.reverse().findIndex(otherTree => otherTree >= tree);
    topViewingDistance = topViewingDistance === -1 ? topTrees.length : topViewingDistance + 1;

    const bottomTrees = grid.slice(y + 1).map(row => row[x]);
    let bottomViewingDistance = bottomTrees.findIndex(otherTree => otherTree >= tree);
    bottomViewingDistance = bottomViewingDistance === -1 ? bottomTrees.length : bottomViewingDistance + 1;

    scenicScore = Math.max(
      leftViewingDistance * rightViewingDistance * topViewingDistance * bottomViewingDistance,
      scenicScore
    );
  });

  return scenicScore;
}, 0));
