// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
// const logMaze = require("./logger");

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

function generateVisited(maze) {
  const visited = [];
  for (let y = 0; y < maze.length; y++) {
    const yAxis = [];
    for (let x = 0; x < maze[y].length; x++) {
      const coordinate = {
        closed: maze[y][x] === 1,
        distance: 0,
        visitedBy: NO_ONE,
        x,
        y,
      };
      yAxis.push(coordinate);
    }
    visited.push(yAxis);
  }
  return visited;
}

function getNeighbors(visited, x, y) {
  const neighbors = [];

  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // up
    neighbors.push(visited[y - 1][x]);
  }
  if (y + 1 < visited.length && !visited[y + 1][x].closed) {
    // down
    neighbors.push(visited[y + 1][x]);
  }
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // left
    neighbors.push(visited[y][x - 1]);
  }
  if (x + 1 < visited[0].length && !visited[y][x + 1].closed) {
    // right
    neighbors.push(visited[y][x + 1]);
  }
  return neighbors;
}

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  const visited = generateVisited(maze);

  visited[yA][xA].visitedBy = BY_A;
  visited[yB][xB].visitedBy = BY_B;

  let aQueue = [visited[yA][xA]];
  let bQueue = [visited[yB][xB]];

  let iteration = 0;

  while (aQueue.length && bQueue.length) {
    iteration++;
    let aNeighbors = [];
    while (aQueue.length) {
      const coordinate = aQueue.shift();
      aNeighbors = aNeighbors.concat(
        getNeighbors(visited, coordinate.x, coordinate.y)
      );
    }
    for (const neighbor of aNeighbors) {
      if (neighbor.visitedBy === BY_B) {
        return neighbor.distance + iteration;
      } else if (neighbor.visitedBy === NO_ONE) {
        neighbor.distance = iteration;
        neighbor.visitedBy = BY_A;
        aQueue.push(neighbor);
      }
    }
    let bNeighbors = [];
    while (bQueue.length) {
      const coordinate = bQueue.shift();
      bNeighbors = bNeighbors.concat(
        getNeighbors(visited, coordinate.x, coordinate.y)
      );
    }
    for (const neighbor of bNeighbors) {
      if (neighbor.visitedBy === BY_A) {
        return neighbor.distance + iteration;
      } else if (neighbor.visitedBy === NO_ONE) {
        neighbor.distance = iteration;
        neighbor.visitedBy = BY_B;
        bQueue.push(neighbor);
      }
    }
  }
  return -1;
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2],
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
