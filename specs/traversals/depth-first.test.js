const preorderTraverse = (node) => {
  return [
    node.value,
    ...(node.left ? preorderTraverse(node.left) : []),
    ...(node.right ? preorderTraverse(node.right) : []),
  ];
};

const inorderTraverse = (node) => {
  return [
    ...(node.left ? inorderTraverse(node.left) : []),
    node.value,
    ...(node.right ? inorderTraverse(node.right) : []),
  ];
};

const postorderTraverse = (node) => {
  return [
    ...(node.left ? postorderTraverse(node.left) : []),
    ...(node.right ? postorderTraverse(node.right) : []),
    node.value,
  ];
};

// unit tests
// do not modify the below code
describe("depth-first traversals", function () {
  const tree = {
    value: 8,
    left: {
      value: 4,
      left: {
        value: 3,
        left: {
          value: 2,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 5,
        left: null,
        right: {
          value: 7,
          left: {
            value: 6,
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: 12,
      left: {
        value: 10,
        left: {
          value: 9,
          left: null,
          right: null,
        },
        right: {
          value: 11,
          left: null,
          right: null,
        },
      },
    },
  };

  it("preorderTraverse", () => {
    expect(preorderTraverse(tree)).toEqual([
      8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11,
    ]);
  });

  it("inorderTraverse", () => {
    expect(inorderTraverse(tree, [])).toEqual([
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
  });

  it("postorderTraverse", () => {
    expect(postorderTraverse(tree, [])).toEqual([
      2, 3, 6, 7, 5, 4, 9, 11, 10, 12, 8,
    ]);
  });
});
