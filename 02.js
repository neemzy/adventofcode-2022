const fs = require("fs");
const data = fs.readFileSync("input_02.txt").toString();

/*const data = `A Y
B X
C Z`;*/

// Part 1
/*console.log(data.split("\n").reduce((sum, line) => {
  const [opponentMove, ownMove] = line.split(" ");
  let score = 0;

  if ((opponentMove === "A" && ownMove === "X")
    || (opponentMove === "B" && ownMove === "Y")
    || (opponentMove === "C" && ownMove === "Z")
  ) {
    score = 3;
  } else if ((opponentMove === "A" && ownMove === "Y")
    || (opponentMove === "B" && ownMove === "Z")
    || (opponentMove === "C" && ownMove === "X")
  ) {
    score = 6;
  }

  return sum + score + (ownMove === "X" ? 1 : ownMove === "Y" ? 2 : 3);
}, 0));*/

// Part 2
console.log(data.split("\n").reduce((sum, line) => {
  const [opponentMove, ownMove] = line.split(" ");

  if (opponentMove === "A") {
    if (ownMove === "X") {
      // lose: rock vs scissors
      return sum + 0 + 3;
    }

    if (ownMove === "Y") {
      // draw: rock vs rock
      return sum + 3 + 1;
    }

    // win: rock vs paper
    return sum + 6 + 2;
  }

  if (opponentMove === "B") {
    if (ownMove === "X") {
      // lose: paper vs rock
      return sum + 0 + 1;
    }

    if (ownMove === "Y") {
      // draw: paper vs paper
      return sum + 3 + 2;
    }

    // win: paper vs scissors
    return sum + 6 + 3;
  }

  if (ownMove === "X") {
    // lose: scissors vs paper
    return sum + 0 + 2;
  }

  if (ownMove === "Y") {
    // draw: scissors vs scissors
    return sum + 3 + 3;
  }

  // win: scissors vs rock
  return sum + 6 + 1;
}, 0));
