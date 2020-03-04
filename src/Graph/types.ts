export type LearningGraph = {
  id: string;
  domain: string;
  nodes: Node[];
  edges: Edge[];
};

export type Node = {
  id: string;
  name: string;
  resources: Resource;
  subGraph?: LearningGraph;
  position: {
    x: number;
    y: number;
  };
};

export type Edge = {
  id: string;
  source: Node;
  target: Node;
  type?: EdgeType;
};

export type EdgeType = string;

export type Resource = {};

type RawNode = {
  id: string;
  name: string;
  resources: Resource;
  position: {
    x: number;
    y: number;
  };
};

type RawEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  type?: EdgeType;
};

export type RawLearningGraph = {
  id: string;
  domain: string;
  nodes: RawNode[];
  edges: RawEdge[];
};
