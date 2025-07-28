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
}

function main() {
    const tree = new Tree([1,2,3,4,5,6,7])
    tree.prettyPrint(tree.root)
}

main()