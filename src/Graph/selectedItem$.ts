import { reduceState } from 'rxbeach/operators';
import { action$ } from '../action$';
import { selectNode, selectEdge } from './actions';
import { reducer } from 'rxbeach';
import { selectedGraph$, findEdgeById, findNodeById } from './selectedGraph$';

const defaultState = null;
export enum SelectedItemType {
  NODE = 'node',
  EDGE = 'edge',
}
type SelectedItemState = null | {
  type: SelectedItemType;
  id: string;
};

const handleSelectNode = reducer(selectNode, (_: SelectedItemState, id) => ({
  type: SelectedItemType.NODE,
  id,
}));
const handleSelectEdge = reducer(selectEdge, (_: SelectedItemState, id) => ({
  type: SelectedItemType.EDGE,
  id,
}));

const handleGraphChange = reducer(
  selectedGraph$,
  (currentSelection: SelectedItemState, graph) => {
    if (!currentSelection) {
      return currentSelection;
    } else if (currentSelection.type === SelectedItemType.NODE) {
      return findNodeById(graph, currentSelection.id) ? currentSelection : null;
    }
    return findEdgeById(graph, currentSelection.id) ? currentSelection : null;
  }
);

export const selectedItem$ = action$.pipe(
  reduceState<SelectedItemState>('selectedItem$', defaultState, [
    handleSelectNode,
    handleSelectEdge,
    handleGraphChange,
  ])
);
