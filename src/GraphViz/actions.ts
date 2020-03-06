import { actionCreator } from 'rxbeach';
import { LearningGraph, Node } from './types';

type Id = string;

export const createNode = actionCreator<Pick<Node, 'name' | 'position'>>(
  'CREATE_NODE'
);
export const updateNode = actionCreator<{ id: string; diff: Partial<Node> }>(
  'UPDATE_NODE'
);
export const updateGraph = actionCreator<{ name: string }>('UPDATE_GRAPH');
export const createGraph = actionCreator<{ name: string }>('CREATE_GRAPH');
export const selectGraph = actionCreator<LearningGraph>('SELECT_GRAPH');

export const createEdge = actionCreator<{ sourceId: string; targetId: string }>(
  'CREATE_EDGE'
);

export const selectEdge = actionCreator<string>('SELECT_EDGE');
export const selectNode = actionCreator<string>('SELECT_NODE');
export const deleteEdge = actionCreator<string>('DELETE_EDGE');
export const deleteNode = actionCreator<string>('DELETE_NODE');
