export type KnowledgeGraph = {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
};

export type Resource =
  | {
      type: ResourceType.VIDEO;
      title: string;
      url: string;
    }
  | {
      type: ResourceType.GOAL_NODES;
      goals: Node;
    };

export type Node = {
  id: string;
  name: string;
  resources: Resource[];
  position: {
    x: number;
    y: number;
  };
};

export type NodeProgress = {
  nodeId: string;
  progress: number;
};

export type Edge = {
  id: string;
  source: Node;
  target: Node;
  type?: EdgeType;
};

export type EdgeType = string;

export enum ResourceType {
  VIDEO = 'video',
  QUIZ = 'quiz',
  GOAL_NODES = 'goal_nodes',
}
export type RawResource =
  | {
      type: ResourceType.VIDEO;
      title: string;
      url: string;
    }
  | {
      type: ResourceType.GOAL_NODES;
      goals: RawNode;
    };

type RawNode = {
  id: string;
  name: string;
  resources: RawResource[];
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

export type RawKnowledgeGraph = {
  id: string;
  name: string;
  nodes: RawNode[];
  edges: RawEdge[];
};
