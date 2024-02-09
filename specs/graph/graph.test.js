// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  let queue = [myId];
  const seen = new Set(queue);
  const jobs = {};

  for (let i = 0; i <= degreesOfSeparation; i++) {
    // once for each degree of separation
    const newQueue = [];
    while (queue.length) {
      // iterate through each person in the queue
      const user = getUser(queue.shift());
      for (let j = 0; j < user.connections.length; j++) {
        // for each connection a user has
        const connection = user.connections[j];
        if (!seen.has(connection)) {
          // if this particular connection hasn't been seen before.
          newQueue.push(connection);
          seen.add(connection);
        }
      }
      jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
      // if we have the job, increment, if not add it with 1
    }
    queue = newQueue;
    // to traverse the next level of connections
  }
  let largestNum = 0;
  let jobName;
  for (const [job, number] of Object.entries(jobs)) {
    if (number > largestNum) {
      jobName = job;
      largestNum = number;
    }
  }
  return jobName;
};

// unit tests
// do not modify the below code
describe("findMostCommonTitle", function () {
  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

describe("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
