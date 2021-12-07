class Node {
	constructor(value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addVertex(vertex) {
		this.nodes.add(vertex);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addVertices(vertexArray) {
		for (const vertex of vertexArray) {
			this.addVertex(vertex);
		}
	}

	// this function accepts two vertices and updates their adjacent values to include the other vertex
	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	// this function accepts two vertices and updates their adjacent values to remove the other vertex
	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	// this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
	removeVertex(vertex) {
		this.nodes.delete(vertex);
		const stack = [...this.nodes];
		const checked = new Set(stack);
		while (stack.length) {
			const node = stack.pop();

			for (const neighbor of node.adjacent) {
				if (neighbor === vertex) {
					node.adjacent.delete(neighbor);
				}
				if (!checked.has(neighbor)) {
					checked.add(neighbor);
					stack.push(neighbor);
				}
			}
		}
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(start, seen = new Set(), values = []) {
		if (!start) return values;
		if (!seen.has(start)) {
			seen.add(start);
			values.push(start.value);
		}
		for (const neighbor of start.adjacent) {
			if (!seen.has(neighbor)) {
				this.depthFirstSearch(neighbor, seen, values);
			}
		}
		return values;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start, queue = [], seen = new Set(), values = []) {
		if (!seen.has(start)) {
			seen.add(start);
			values.push(start.value);
			queue.push(start);
		}
		for (const neighbor of start.adjacent) {
			if (!seen.has(neighbor)) {
				queue.push(neighbor);
			}
		}
		if (!queue.length) {
			return values;
		}
		return this.breadthFirstSearch(queue.shift(), queue, seen, values);
	}
}

module.exports = { Graph, Node };
