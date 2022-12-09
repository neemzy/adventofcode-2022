const fs = require("fs");
const data = fs.readFileSync("input_06.txt").toString();

//const data = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"; // 7/19
//const data = "bvwbjplbgvbhsrlpgdmjqwftvncz"; // 5/23
//const data = "nppdvjthqldpwncqszvftbrmjlhg"; // 6/23
//const data = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"; // 10/29
//const data = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"; // 11/26

function getCharacterCountUntilUniqueChars(data, length) {
  let count = Infinity;

  for (let i = length - 1; i < data.length; i++) {
    const end = i + 1;
    const set = Array.from(new Set(data.slice(i - (length - 1), end)));

    if (set.length === length) {
      count = end;
      break;
    }
  }

  return count;
}

// Part 1
//console.log(getCharacterCountUntilUniqueChars(data, 4));

// Part 2
console.log(getCharacterCountUntilUniqueChars(data, 14));
