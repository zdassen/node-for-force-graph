# node-for-force-graph
JavaScript node class for D3.js force graph

# Example
```JavaScript
// create nodes
// Array [0, 1] is irrelevant to node ids
let [n0, n1] = [0, 1].map(n => new BaseNode());
n0.id;    // 0
n1.id;    // 1

// connect n1 to n2 ( id 0 → id 1 )
n0.to(n1);

// get nodes data for D3.js force-layout graph
let nodes = BaseNode.createdNodes;
nodes.forEach(node => console.log(node.id));    // 0, 1

// get link data for D3.js force-layout graph
let links = BaseNode.toLinks();    // [{source: 0, target: 1}]

// draw force-layout graph by my "class-based-force-graph"
let svgId = "svgArea";    // <svg id="svgArea"></svg>
let force = new Force(svgId, nodes, links);
```

# to() is chainable
```JavaScript
let [n2, n3, n4, n5] = [2, 3, 4, 5].map(n => new BaseNode());

// connect n2 → n3
let curEdgeNode = n2.to(n3);    // current edge is n3

// so we can do this ( connect n3 → n4 → n5 )
curEdgeNode = curEdgeNode.to(n4).to(n5);    // current edge is n5
```

# connect to() multiple nodes
```JavaScript
let [n6, n7] = [6, 7].map(n => new BaseNode());

// connect n5 → n6 and n5 → n7
curEdgeNode.to(n6, n7);
curEdgeNode.targets.map(node => node.id).join(", ");    // 6, 7
```

# create long-chained nodes (ha ha ha)
```JavaScript
// ids ( but irrelevent to node ids... )
let psuedoIds = Array.from(Array(10).keys());

// create many nodes
let manyNodes = psuedoIds.map(pid => new BaseNode());

// create long-chained nodes
manyNodes.reduce((prevNode, curNode) => {
  let curEdge = prevNode.to(curNode);
  return curEdge;
});

// do finish routine
let links = BaseNode.toLinks();

// draw graph
let svgId = "svgArea";
let force = new MyForce(svgId, manyNodes, links);
```

![long-chained-nodes](https://github.com/zdassen/node-for-force-graph/blob/images/long-chained-graph.JPG)
