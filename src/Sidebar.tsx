import React from 'react';
import { Node, Edge } from './GraphViz/types';
import { useStream } from './useStream';
import {
  selectedGraph$,
  findNodeById,
  findEdgeById,
} from './GraphViz/selectedGraph$';
import { dispatchAction } from './action$';
import { deleteEdge, updateNode } from './GraphViz/actions';
import { selectedItem$, SelectedItemType } from './GraphViz/selectedItem$';
import { withLatestFrom, map } from 'rxjs/operators';
import Button from '@material-ui/core/Button';
import {
  Drawer,
  Input,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { curriculum } from './GraphViz/data';

const getRelevantChapter = (nodeName: string) => {
  return curriculum['MAT1-04-4'].chapters.find(
    ({ title }) => title === nodeName
  );
};

const isNode = (item: Node | Edge): item is Node => !(item as Edge).source;
const SelectedItem = ({ item }: { item: Node | Edge }) => {
  if (isNode(item)) {
    const chapter = getRelevantChapter(item.name);
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
        {chapter && (
          <>
            <Typography color="textSecondary" gutterBottom>
              Relevant goals
            </Typography>
            <List dense>
              {chapter.goals.map(goal => {
                return (
                  <ListItem key={goal}>
                    <ListItemText primary={goal} />
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
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

const DrawerContent = styled.div`
  max-height: 150px;
  overflow-y: scroll;
  padding: 0 40px;
`;

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
    <Drawer variant="permanent" anchor="bottom" open={true}>
      <DrawerContent>
        {!selectedItem && <h4>Nothing selected</h4>}
        {selectedItem && <SelectedItem item={selectedItem} />}
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
