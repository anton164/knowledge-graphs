import { reduceState } from 'rxbeach/operators';
import { action$ } from '../action$';
import { CampusIncrementGraph } from './data';
import {
  selectGraph,
  updateNode,
  createNode,
  createEdge,
  deleteEdge,
  deleteNode,
  updateGraph,
  createGraph,
} from './actions';
import { reducer } from 'rxbeach';
import { KnowledgeGraph, Node } from '../types';
import { generateId } from '../utils';

const defaultState = CampusIncrementGraph;
export const findNodeById = (graph: KnowledgeGraph, id: string) =>
  graph.nodes.find(node => node.id === id);

export const findEdgeById = (graph: KnowledgeGraph, id: string) =>
  graph.edges.find(edge => edge.id === id);

const handleSelectGraph = reducer(
  selectGraph,
  (_: KnowledgeGraph, graph) => graph
);
const handleUpdateNode = reducer(
  updateNode,
  (graph: KnowledgeGraph, { id, diff }) => {
    const oldNode = findNodeById(graph, id);
    if (!oldNode) {
      throw Error('Node not found when updating');
    }
    const updatedNode = {
      ...oldNode,
      ...diff,
    };
    const newGraph = {
      ...graph,
      nodes: graph.nodes.map(node => {
        if (node.id === updatedNode.id) return updatedNode;
        return node;
      }),
      edges: graph.edges.map(({ source, target, ...edge }) => {
        return {
          ...edge,
          source: source.id === updatedNode.id ? updatedNode : source,
          target: target.id === updatedNode.id ? updatedNode : target,
        };
      }),
    };
    return newGraph;
  }
);
const handleCreateNode = reducer(
  createNode,
  (graph: KnowledgeGraph, { name, position }) => {
    return {
      ...graph,
      nodes: [
        ...graph.nodes,
        {
          name,
          position,
          resources: [],
          id: generateId(),
        } as Node,
      ],
    };
  }
);

const handleCreateEdge = reducer(
  createEdge,
  (graph: KnowledgeGraph, { sourceId, targetId }) => {
    const source = findNodeById(graph, sourceId);
    const target = findNodeById(graph, targetId);
    if (!source || !target) {
      throw Error('Node not found when creating edges');
    }
    const newGraph: KnowledgeGraph = {
      ...graph,
      edges: [
        ...graph.edges,
        {
          source,
          target,
          id: generateId(),
        },
      ],
    };
    return newGraph;
  }
);

const handleCreateGraph = reducer(
  createGraph,
  (_: KnowledgeGraph, { name }) => {
    return { id: generateId(), name, nodes: [], edges: [] };
  }
);

const handleUpdateGraph = reducer(
  updateGraph,
  (graph: KnowledgeGraph, { name }) => {
    return { ...graph, name };
  }
);

const handleDeleteEdge = reducer(deleteEdge, (graph: KnowledgeGraph, id) => {
  return { ...graph, edges: graph.edges.filter(edge => edge.id !== id) };
});

const handleDeleteNode = reducer(deleteNode, (graph: KnowledgeGraph, id) => {
  return { ...graph, nodes: graph.nodes.filter(node => node.id !== id) };
});

export const selectedGraph$ = action$.pipe(
  reduceState('selectedGraph$', defaultState, [
    handleSelectGraph,
    handleUpdateNode,
    handleCreateNode,
    handleCreateEdge,
    handleDeleteEdge,
    handleDeleteNode,
    handleCreateGraph,
    handleUpdateGraph,
  ])
);
