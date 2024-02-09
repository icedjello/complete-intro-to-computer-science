/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return result.concat(left, right);
};

const mergeSort = (numbers) => {
  if (numbers.length < 2) {
    return numbers;
  }
  const middle = Math.floor(numbers.length / 2);
  const sortedLeft = mergeSort(numbers.slice(0, middle));
  const sortedRight = mergeSort(numbers.slice(middle));

  return merge(sortedLeft, sortedRight);
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const nums2 = [3, 2, 1];
  const ans2 = mergeSort(nums2);
  expect(ans2).toEqual([1, 2, 3]);
});
