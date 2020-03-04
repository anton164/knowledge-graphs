import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GraphViz from './Graph/GraphViz';
import { readAllGraphs, writeGraphData } from './api/firebase';
import { LearningGraph, Node, Edge } from './Graph/types';
import { useStream } from './useStream';
import {
  selectedGraph$,
  findNodeById,
  findEdgeById,
} from './Graph/selectedGraph$';
import { dispatchAction } from './action$';
import {
  selectGraph,
  deleteNode,
  deleteEdge,
  updateNode,
} from './Graph/actions';
import { selectedItem$, SelectedItemType } from './Graph/selectedItem$';
import { withLatestFrom, map } from 'rxjs/operators';
import Button from '@material-ui/core/Button';
import { Drawer, Divider, Input } from '@material-ui/core';

const Wrapper = styled.div`
  font-family: 'Helvetica';
`;

const isNode = (item: Node | Edge): item is Node => !(item as Edge).source;
const EditSelectedItem = ({ item }: { item: Node | Edge }) => {
  if (isNode(item)) {
    return (
      <h4>
        Selected node
        <br />
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
        <Button
          color="secondary"
          onClick={() => dispatchAction(deleteNode(item.id))}
        >
          Delete
        </Button>
      </h4>
    );
  }
  return (
    <h4>
      Selected {item.source.name} --&gt; {item.target.name}
      <Button onClick={() => dispatchAction(deleteEdge(item.id))} />
    </h4>
  );
};

export default function App() {
  const selectedGraph = useStream(selectedGraph$, null);
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
  const [graphs, setGraphs] = useState<LearningGraph[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedGraphs = await readAllGraphs();
      setGraphs(fetchedGraphs);
      dispatchAction(selectGraph(fetchedGraphs[0]));
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      <Drawer variant="permanent" anchor="right" open={true}>
        <Divider />
        {selectedItem && <EditSelectedItem item={selectedItem} />}
      </Drawer>
      <h4>Listing graphs:</h4>
      <ul>
        {graphs.map(graph => (
          <ul key={graph.id} onClick={() => dispatchAction(selectGraph(graph))}>
            {graph.domain}
          </ul>
        ))}
      </ul>
      {selectedGraph && (
        <>
          <h3>Learning Graph: {selectedGraph.domain}</h3>
          <Button
            color="primary"
            onClick={() =>
              writeGraphData(selectedGraph).then(console.log.bind(null))
            }
          >
            Save Graph
          </Button>
          <GraphViz graph={selectedGraph} />
        </>
      )}
    </Wrapper>
  );
}
