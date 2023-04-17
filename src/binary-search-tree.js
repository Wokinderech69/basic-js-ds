const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = new Node(null);
  }

  root() {
    return this.rootNode.data ? this.rootNode : null;
  }

  add(data) {
    const findPlaceForData = (node) => {
      if (!node) {
        return new Node(data);
      } else if (data < node.data) {
        if (node.left) {
          findPlaceForData(node.left);
        } else {
          node.left = findPlaceForData(node.left);
        }
      } else if (data > node.data) {
        if (node.right) {
          findPlaceForData(node.right);
        } else {
          node.right = findPlaceForData(node.right);
        }
      } else if (data === node.data) {
        return;
      }
    };
    if (this.rootNode.data === null) {
      this.rootNode = new Node(data);
    } else {
      findPlaceForData(this.rootNode);
    }
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (currentNode.data === data) {
        return true;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (data !== currentNode.data) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      if (currentNode === null) {
        return null;
      }
    }
    return currentNode;
  }

  remove(data) {
    const deledeNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = deledeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deledeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let rightMin = node.right;
        while (rightMin.left) {
          rightMin = rightMin.left;
        }
        node.data = rightMin.data;
        node.right = deledeNode(node.right, rightMin.data);
        return node;
      }
    };
    this.rootNode = deledeNode(this.rootNode, data);
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
