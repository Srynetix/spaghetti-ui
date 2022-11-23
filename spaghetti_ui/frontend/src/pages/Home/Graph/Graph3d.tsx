import { GraphWrapper } from "../../../graph";
import ForceGraph3D, { LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import { NodeObject } from "react-force-graph-2d";
import { useCallback, useState } from "react";

export interface Graph2dProps {
  graph: GraphWrapper;
  width: number;
  height: number;
  filteredPatterns: string[];
  colorizeFilteredModules: boolean;
}

const isNodeFiltered = (filteredPatterns: string[], id: string): boolean => {
  if (filteredPatterns.filter((p) => id.includes(p)).length > 0) {
    return true;
  } else {
    return false;
  }
};

const Graph3d = ({
  graph,
  width,
  height,
  filteredPatterns,
  colorizeFilteredModules,
}: Graph2dProps) => {
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node: NodeObject | null) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (node) {
      const id = node.id as string;

      highlightNodes.add(node);
      graph.neighbors[id].forEach((neighbor) => highlightNodes.add(neighbor));
      graph.links[id].forEach((link) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link: LinkObject | null) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const drawObject = useCallback(
    (node: NodeObject) => {
      // The "node" object should be mutable, and can contain
      // any attributes
      const nodeProps = node as Record<string, string>;
      const id = node.id as string;

      if (
        colorizeFilteredModules &&
        isNodeFiltered(filteredPatterns, id)
      ) {
        nodeProps.color = "#00ff00";
      }

      const sprite = new SpriteText(id);
      sprite.color = nodeProps.color;
      sprite.fontWeight = "bold";
      sprite.textHeight = highlightNodes.has(node) ? 6 : 4;
      return sprite;
    },
    [colorizeFilteredModules, hoverNode]
  )

  return (
    <ForceGraph3D
      graphData={graph.graph}
      linkAutoColorBy="group"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkWidth={(link) => (highlightLinks.has(link) ? 1 : 0.5)}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) =>
        highlightLinks.has(link) ? 1.5 : 0
      }
      nodeAutoColorBy="group"
      width={width}
      height={height}
      nodeThreeObject={drawObject}
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
    />
  );
};

export default Graph3d;
