import { SpaghettiDependenciesData } from "../api";

export interface NodeData {
  id: string;
}

export interface NodeLinkData {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: NodeData[];
  links: NodeLinkData[];
}

export class GraphWrapper {
  dependencies: SpaghettiDependenciesData;
  graph: GraphData;
  neighbors: Record<string, string[]>;
  nodeIndex: Record<string, number>;
  links: Record<string, NodeLinkData[]>;

  constructor(dependencies: SpaghettiDependenciesData) {
    this.dependencies = dependencies;
    this.neighbors = {};
    this.links = {};
    this.nodeIndex = {};
    this.graph = this._buildGraph();

    this._computeNodeIndex();
    this._computeGraphNeighbors();
    this._computeGraphLinks();
  }

  getNodeCount(): number {
    return this.graph.nodes.length
  }

  _buildGraph(): GraphData {
    const data: GraphData = {
      nodes: [],
      links: [],
    };

    const seenNodes = new Set();

    const tryAddNode = (key: string) => {
      if (!seenNodes.has(key)) {
        seenNodes.add(key);
        data.nodes.push({
          id: key
        });
      }
    };

    const addLink = (source: string, target: string) => {
      data.links.push({
        source,
        target
      });
    };

    for (const key of Object.keys(this.dependencies)) {
      tryAddNode(key)

      this.dependencies[key].forEach((l) => {
        tryAddNode(l)
        addLink(key, l)
      });
    }

    return data;
  }

  _computeNodeIndex() {
    this.graph.nodes.forEach((node, idx) => {
      this.nodeIndex[node.id] = idx;
    });
  }

  _computeGraphNeighbors() {
    this.graph.nodes.forEach((node) => this._computeNeighborsForId(node.id));
  }

  _computeNeighborsForId(id: string) {
    this.neighbors[id] = this.graph.links
      .filter((l) => l.source == id || l.target == id)
      .map((l) => {
        if (l.source == id) {
          return l.target;
        } else {
          return l.source;
        }
      });
  }

  _computeGraphLinks() {
    this.graph.links.forEach((l) => {
      if (!(l.source in this.links)) {
        this.links[l.source] = [];
      }
      if (!(l.target in this.links)) {
        this.links[l.target] = [];
      }

      this.links[l.source].push(l);
      this.links[l.target].push(l);
    });
  }
}
