class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = this.sortArray(array)
        this.arrayLengthAtStart = this.array.length
        this.root = this.buildTree(this.array)
    }

    sortArray(array) {
        array = [...new Set(array)]
        array.sort((a,b) => {return a - b})
        return array
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) return
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
        }
    }

    buildTree(array) {
        const start = 0
        const end = array.length - 1
        if (start > end) return null
        const mid = Math.floor(end / 2)
        const root = new Node(array[mid])

        root.left = this.buildTree(array.slice(start, mid))
        root.right = this.buildTree(array.slice(mid + 1, end + 1))
        return root
    }

    insert(value) {
        let node = this.root
        while (node) {
            if (value > node.data) {
                if (node.right) {
                    node = node.right
                } else {
                    node.right = new Node(value)
                    break
                }
            } else if (value < node.data) {
                if (node.left) {
                    node = node.left
                } else {
                    node.left = new Node(value)
                    break
                }
            } else {
                //duplicates are ignored
                break
            }
        }
    }

    deleteItem(value) {
        let wasPreviousStepLeft
        let previous = null
        let node = this.root
        while (node) {
            if (value > node.data) {
                if (node.right) {
                    previous = node
                    wasPreviousStepLeft = false
                    node = node.right
                } else {
                    return
                }
            } else if (value < node.data) {
                if (node.left) {
                    previous = node
                    wasPreviousStepLeft = true
                    node = node.left
                } else {
                    return
                }
            } else {
                if (node.left === null && node.right === null) {
                    if (wasPreviousStepLeft) previous.left = null
                    else previous.right = null
                } else if (node.left !== null && node.right !== null) {
                    //poistettavalla kaksi alasolmua
                } else {
                    if (wasPreviousStepLeft) {
                        if (node.left) {
                            previous.left = node.left
                        } else {
                            previous.left = node.right
                        }
                    } else {
                        if (node.left) {
                            previous.right = node.left
                        } else {
                            previous.right = node.right
                        }
                    }
                }
                return
            }
        }
        //Jos poistettavalla on kaksi alasolmua niin mennään poistettavan oikeata puuta
        //alas vasemmalle niin kauan kunnes löytyy solmu jolla ei ole vasenta alasolmua

        //mitä jos poistettava on kaikesta ylin solmu?
    }

    find(value) {
        let node = this.root
        while (node) {
            if (value > node.data) {
                if (node.right) {
                    node = node.right
                } else {
                    return null
                    break
                }
            } else if (value < node.data) {
                if (node.left) {
                    node = node.left
                } else {
                    return null
                }
            } else {
                return node
            }
        }
    }
}

function main() {
    const tree = new Tree([7,6,2,1,2,1,1,3,7,5,3,4,1,7])
    tree.insert(5)
    tree.insert(8)
    tree.insert(10)
    tree.insert(3.5)
    tree.prettyPrint(tree.root)

    /*tree.deleteItem(10)
    tree.deleteItem(7)
    tree.deleteItem(6)
    tree.deleteItem(2)*/

    /*console.log(tree.find(2));
    console.log(tree.find(8));
    console.log(tree.find(10));
    console.log(tree.find(11));*/
}

main()