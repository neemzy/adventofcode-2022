const fs = require("fs");
const data = fs.readFileSync("input_09.txt").toString();

/*const data = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;*/

/*const data = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;*/

function move(knot, direction) {
  switch (direction) {
    case "U":
      knot.y--;
      break;

    case "R":
      knot.x++;
      break;

    case "D":
      knot.y++;
      break;

    case "L":
      knot.x--;
      break;
  }

  return knot;
}

function follow(tail, head) {
  const xDiff = tail.x - head.x;
  const yDiff = tail.y - head.y;
  const xDirection = xDiff > 0 ? "L" : "R";
  const yDirection = yDiff > 0 ? "U" : "D";

  // "If the head is ever two steps directly up, down, left, or right from the tail,
  // the tail must also move one step in that direction so it remains close enough:"
  if (xDiff === 0 && Math.abs(yDiff) >= 2) {
    return move(tail, yDirection);
  }

  if (yDiff === 0 && Math.abs(xDiff) >= 2) {
    return move(tail, xDirection);
  }

  // "Otherwise, if the head and tail aren't touching and aren't in the same row
  // or column, the tail always moves one step diagonally to keep up:"
  if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
    return move(move(tail, xDirection), yDirection);
  }

  return tail;
}

// Part 1
/*console.log(data.split("\n").reduce((acc, datum) => {
  let [direction, remainingSteps] = datum.split(" ");

  while (remainingSteps > 0) {
    acc.head = move(acc.head, direction);
    acc.tail = follow(acc.tail, acc.head);

    if (!acc.history.find(position => position.x === acc.tail.x && position.y === acc.tail.y)) {
      acc.history.push({...acc.tail});
    }

    remainingSteps--;
  }

  return acc;
}, {
  head: {x: 0, y: 0},
  tail: {x: 0, y: 0},
  history: [{x: 0, y: 0}]
}).history.length);*/

// Part 2
console.log(data.split("\n").reduce((acc, datum) => {
  let [direction, remainingSteps] = datum.split(" ");
  const tail = acc.knots[acc.knots.length - 1];

  while (remainingSteps > 0) {
    acc.knots[0] = move(acc.knots[0], direction);

    for (let i = 1; i < acc.knots.length; i++) {
      acc.knots[i] = follow(acc.knots[i], acc.knots[i - 1]);
    }

    if (!acc.history.find(position => position.x === tail.x && position.y === tail.y)) {
      acc.history.push({...tail});
    }

    remainingSteps--;
  }

  return acc;
}, {
  knots: [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
  ],
  history: [{x: 0, y: 0}]
}).history.length);
