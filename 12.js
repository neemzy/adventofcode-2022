const fs = require("fs");
const data = fs.readFileSync("input_12.txt").toString();

/*const data = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;*/

function isPossibleStep(from, to) {
  if (from === "S") {
    from = "a";
  }

  if (to === "E") {
    to = "z";
  }

  return to.charCodeAt() - from.charCodeAt() <= 1;
}

function findPossibleSteps(map, x, y) {
  const possibleSteps = [];

  if (x > 0 && isPossibleStep(map[y][x], map[y][x - 1])) {
    possibleSteps.push({x: x - 1, y});
  }

  if (x < map[y].length - 1 && isPossibleStep(map[y][x], map[y][x + 1])) {
    possibleSteps.push({x: x + 1, y});
  }

  if (y > 0 && isPossibleStep(map[y][x], map[y - 1][x])) {
    possibleSteps.push({x, y: y - 1});
  }

  if (y < map.length - 1 && isPossibleStep(map[y][x], map[y + 1][x])) {
    possibleSteps.push({x, y: y + 1});
  }

  return possibleSteps;
}

function getStartCoordinates(map) {
  const y = map.findIndex(row => row.includes("S"));

  return {
    x: map[y].indexOf("S"),
    y
  }
}

function findExitDepths(map, coords, exitDepths = [], history = [], depth = 0) {
  if (map[coords.y][coords.x] === "E") {
    exitDepths.push(depth);
  }

  const paths = findPossibleSteps(map, coords.x, coords.y)
    .filter(path => (path.x !== coords.x || path.y !== coords.y)
      && !history.find(historyItem => path.x === historyItem.x && path.y === historyItem.y)
    );

  paths.forEach(path => {
    findExitDepths(map, path, exitDepths, [...history, coords], depth + 1);
  });
}

// This is all too slow, implement proper pathfinding algorithm
// https://www.baeldung.com/cs/dfs-vs-bfs-vs-dijkstra

const map = data.split("\n").map(row => row.split(""));
const exitDepths = [];
findExitDepths(map, getStartCoordinates(map), exitDepths);

console.log(exitDepths.sort((a, b) => a - b).shift());
