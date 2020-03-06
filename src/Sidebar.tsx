import React from 'react';
import { Node, Edge } from './GraphViz/types';
import { useStream } from './useStream';
import {
  selectedGraph$,
  findNodeById,
  findEdgeById,
} from './GraphViz/selectedGraph$';
import { dispatchAction } from './action$';
import { deleteNode, deleteEdge, updateNode } from './GraphViz/actions';
import { selectedItem$, SelectedItemType } from './GraphViz/selectedItem$';
import { withLatestFrom, map } from 'rxjs/operators';
import Button from '@material-ui/core/Button';
import { Drawer, Input, InputLabel, FormControl } from '@material-ui/core';

const isNode = (item: Node | Edge): item is Node => !(item as Edge).source;
const SelectedItem = ({ item }: { item: Node | Edge }) => {
  if (isNode(item)) {
    return (
      <>
        <h4>Selected node</h4>
        <FormControl fullWidth>
          <InputLabel>Name</InputLabel>
          <Input
            value={item.name}
            onChange={event => {
              dispatchAction(
                updateNode({
                  id: item.id,
                  diff: {
                    name: event.target.value,
                  },
                })
              );
            }}
          />
        </FormControl>
        <Button
          color="secondary"
          onClick={() => dispatchAction(deleteNode(item.id))}
        >
          Delete
        </Button>
      </>
    );
  }
  return (
    <>
      <h4>
        Selected {item.source.name} --&gt; {item.target.name}
      </h4>
      <Button
        color="secondary"
        onClick={() => dispatchAction(deleteEdge(item.id))}
      >
        Delete
      </Button>
    </>
  );
};

const Sidebar = () => {
  const selectedItem = useStream(
    selectedItem$.pipe(
      withLatestFrom(selectedGraph$),
      map(([item, graph]) => {
        if (!item) {
          return null;
        } else if (item.type === SelectedItemType.NODE) {
          return findNodeById(graph, item.id);
        }
        return findEdgeById(graph, item.id);
      })
    ),
    null
  );
  return (
    <Drawer variant="permanent" anchor="right" open={true}>
      {selectedItem && <SelectedItem item={selectedItem} />}
    </Drawer>
  );
};

export default Sidebar;