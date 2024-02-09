/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

function bubbleSort(numberArray) {
  let didSwap = false;
  do {
    didSwap = false;
    for (let i = 0; i < numberArray.length; i++) {
      if (numberArray[i] > numberArray[i + 1]) {
        const temp = numberArray[i];
        numberArray[i] = numberArray[i + 1];
        numberArray[i + 1] = temp;
        didSwap = true;
      }
    }
  } while (didSwap);
  return numberArray;
}

// unit tests
// do not modify the below code
test("bubble sort", function () {
  const numbers = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNumbers = bubbleSort(numbers);
  expect(sortedNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
