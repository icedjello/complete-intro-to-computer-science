import React from "react";
import { shuffle, range } from "lodash";
import { App, snapshot, done, clear } from "./sort-visualizer";

import "./sort.css";
// // BUBBLE SORT
// function sort(numbers) {
//   // do cool stuff here
//   let didSwap = false;
//   do {
//     didSwap = false;
//     for (let i = 0; i < numbers.length - 1; i++) {
//       snapshot(numbers);
//       if (numbers[i] > numbers[i + 1]) {
//         const temp = numbers[i];
//         numbers[i] = numbers[i + 1];
//         numbers[i + 1] = temp;
//         didSwap = true;
//       }
//     }
//   } while (didSwap);

//   // call snapshot any time you do anything to the array
//   // it's okay if you call it with duplicate value array,
//   // it will deduplicate for you
//   snapshot(numbers);
// }

// // INSERTION SORT
// function sort(numbers) {
//   snapshot(numbers);
//   for (let i = 1; i < numbers.length; i++) {
//     const numberToInsert = numbers[i];
//     let j;
//     for (j = i - 1; j >= 0 && numbers[j] > numberToInsert; j--) {
//       numbers[j + 1] = numbers[j];
//     }
//     numbers[j + 1] = numberToInsert;
//     snapshot(numbers);
//   }
//   snapshot(numbers);
// }

// // RADIX SORT
function getDigit(number, place, longestNumber) {
  const string = number.toString();
  const size = string.length;
  const mod = longestNumber - size;

  return string[place - mod] || 0;
}

function getLongestNumber(numbers) {
  let biggestNumber = 0;
  for (number of numbers) {
    if (number > biggestNumber) result = biggestNumber;
  }
  return result.toString().length;
}

function sort(numbers) {
  snapshot(numbers);
  // find longest number,
  const longestNumber = getLongestNumber(numbers);
  // create how many buckets you need
  // an array of 10 arrays
  const buckets = new Array(10).fill().map(() => []);

  // for loop for how many iterations you need to do (longest number)
  // // enqueue the numbers into their buckets
  for (let i = longestNumber - 1; i >= 0; i--) {
    snapshot(numbers);
    while (numbers.length) {
      const current = numbers.shift();
      buckets[getDigit(current, i, longestNumber)].push(current);
    }

    // // for loop for each bucket, dequeue all of the results
    for (bucket of buckets) {
      while (bucket.length) {
        numbers.push(bucket.shift());
        snapshot(numbers);
      }
    }
  }
  snapshot(numbers);
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(50)));
  done();
  return <App />;
}
