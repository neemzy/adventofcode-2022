const fs = require("fs");
const data = fs.readFileSync("input_07.txt").toString();

/*const data = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;*/

function getReference(tree, cwd) {
  const cwdCopy = [...cwd];
  let ref = tree;

  while (cwdCopy.length > 0) {
    ref = ref[cwdCopy[0]];
    cwdCopy.shift();
  }

  return ref;
}

function getDirectorySize(dir) {
  return Object.entries(dir).reduce((sum, [name, value]) => {
    return sum + (typeof value === "number" ? value : getDirectorySize(value));
  }, 0);
}

const tree = data.split("\n").reduce((acc, line) => {
  if (line.match(/^\$ cd/)) {
    const dirname = line.split(" ").pop();

    if (dirname === "..") {
      acc.cwd.pop();
    } else {
      const ref = getReference(acc.tree, acc.cwd);
      ref[dirname] = {};
      acc.cwd.push(dirname);
    }
  } else if (!line.match(/^\$/)) {
    const [size, filename] = line.split(" ");
    const parsedSize = parseInt(size);

    if (!isNaN(parsedSize)) {
      const ref = getReference(acc.tree, acc.cwd);
      ref[filename] = parsedSize;
    }
  }

  return acc;
}, {
  tree: {},
  cwd: []
}).tree;

// Part 1
/*function getSumOfDirectorySizesUnder100k(dir) {
  return Object.entries(dir).reduce((sum, [name, value]) => {
    if (typeof value !== "object") {
      return sum;
    }

    const size = getDirectorySize(value);

    if (size <= 100000) {
      sum += size;
    }

    return sum + getSumOfDirectorySizesUnder100k(value);
  }, 0);
}

console.log(getSumOfDirectorySizesUnder100k(tree));*/

// Part 2
const spaceToFree = 30000000 - (70000000 - getDirectorySize(tree));

function getSizeOfSmallestDeletableDirectory(dir, overallSmallestSize = Infinity) {
  return Object.entries(dir).reduce((smallestSize, [name, value]) => {
    if (typeof value !== "object") {
      return smallestSize;
    }

    const size = getDirectorySize(value);

    return getSizeOfSmallestDeletableDirectory(
      value,
      size >= spaceToFree && size < smallestSize ? size : smallestSize
    );

  }, overallSmallestSize);
}

console.log(getSizeOfSmallestDeletableDirectory(tree));
