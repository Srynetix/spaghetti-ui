import ForceGraph2D, { LinkObject, NodeObject } from "react-force-graph-2d";
import { useCallback, useState } from "react";

import { GraphWrapper } from "../../../graph";

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

const Graph2d = ({
  graph,
  width,
  height,
  filteredPatterns,
  colorizeFilteredModules,
}: Graph2dProps) => {
  const NODE_R = 4;

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

  const paintRing = useCallback(
    (node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const id = node.id as string;
      const x = node.x as number;
      const y = node.y as number;

      const fontSize = (node == hoverNode ? 20 : 12) / globalScale;
      const label = id;

      ctx.beginPath();
      ctx.arc(x, y, NODE_R, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === hoverNode ? "darkgreen" : "brown";
      ctx.fill();

      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle =
        colorizeFilteredModules && isNodeFiltered(filteredPatterns, id)
          ? "#00ff00"
          : "white";
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.fillText(label, x, y);
    },
    [colorizeFilteredModules, hoverNode, filteredPatterns]
  );

  return (
    <ForceGraph2D
      graphData={graph.graph}
      backgroundColor={"#000011"}
      nodeAutoColorBy="group"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkAutoColorBy="group"
      width={width}
      height={height}
      nodeRelSize={NODE_R}
      autoPauseRedraw={false}
      linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) =>
        highlightLinks.has(link) ? 4 : 0
      }
      nodeCanvasObject={paintRing}
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
    />
  );
};

export default Graph2d;
