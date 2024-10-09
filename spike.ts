let spikeVerts: Point3[] = [];
spikeVerts.push(new Point3(-7.0, -7.0, 7.0));
spikeVerts.push(new Point3(0.0, 7.0, 0.0));
spikeVerts.push(new Point3(-7.0, -7.0, -7.0));
spikeVerts.push(new Point3(7.0, -7.0, 7.0));
spikeVerts.push(new Point3(7.0, -7.0, -7.0));

let spikeEdges: Edge[] = [];
spikeEdges.push(new Edge(0, 1));
spikeEdges.push(new Edge(0, 2));
spikeEdges.push(new Edge(1, 2));
spikeEdges.push(new Edge(2, 1));
spikeEdges.push(new Edge(2, 4));
spikeEdges.push(new Edge(1, 4));
spikeEdges.push(new Edge(4, 1));
spikeEdges.push(new Edge(4, 3));
spikeEdges.push(new Edge(1, 3));
spikeEdges.push(new Edge(3, 1));
spikeEdges.push(new Edge(3, 0));
spikeEdges.push(new Edge(1, 0));
spikeEdges.push(new Edge(4, 0));
spikeEdges.push(new Edge(4, 2));
spikeEdges.push(new Edge(0, 2));
spikeEdges.push(new Edge(4, 3));
spikeEdges.push(new Edge(4, 0));
spikeEdges.push(new Edge(3, 0));

let spikeObj = new GObject(11, spikeVerts, spikeEdges, new Point3(0, 0, 0));