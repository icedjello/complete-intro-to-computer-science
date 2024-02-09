/* 

  write a function that accepts an array that only contains
  two types of things: numbers and arrays. those nested arrays
  also only contain numbers and other, nested arrays.

  example: nestedAdd([1, 2, [3]]) = 6
           nestedAdd([[[2]], 1, [1, 3]]) = 7
 
 */

function nestedAdd(array) {
  // write code here
  let result = 0;
  // // try 1
  // for (el of array) {
  // if (el.length) {
  //   result += nestedAdd(el);
  //   continue;
  // }
  // result += el;
  // }

  // // try 2
  // for (el of array) {
  //   result += el.length ? nestedAdd(el) : el;
  // }

  //try 3
  array.forEach((el) => {
    result += Array.isArray(el) ? nestedAdd(el) : el;
  });

  return result;
}

test("nested arrays addition", () => {
  expect(nestedAdd([1, 2, 3])).toEqual(6);
  expect(nestedAdd([1, [2], 3])).toEqual(6);
  expect(nestedAdd([[[[[[[[[5]]]]]]]]])).toEqual(5);
  expect(nestedAdd([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
});
