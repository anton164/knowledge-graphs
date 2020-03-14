import { reduceState } from 'rxbeach/operators';
import { action$ } from '../action$';
import { reducer } from 'rxbeach';
import { selectedGraph$ } from './selectedGraph$';
import { NodeProgress, Node } from './types';

type GraphProgressState = {
  byNodeId: Record<string, NodeProgress>;
};
const defaultState: GraphProgressState = {
  byNodeId: {},
};

const getNodeProgress = (node: Node): NodeProgress => {
  return {
    nodeId: node.id,
    progress: Math.random() * 100,
  };
};

const handleGraphChange = reducer(
  selectedGraph$,
  (currentSelection: GraphProgressState, graph) => {
    if (!currentSelection) {
      return {
        byNodeId: {},
      };
    }
    return {
      byNodeId: Object.fromEntries(
        graph.nodes.map(node => [node.id, getNodeProgress(node)])
      ),
    };
  }
);

export const graphProgress$ = action$.pipe(
  reduceState<GraphProgressState>('selectedItem$', defaultState, [
    handleGraphChange,
  ])
);
