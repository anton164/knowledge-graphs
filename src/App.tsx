import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GraphViz from './GraphViz/GraphViz';
import { readAllGraphs, writeGraphData } from './api/firebase';
import { LearningGraph } from './GraphViz/types';
import { useStream } from './useStream';
import { selectedGraph$ } from './GraphViz/selectedGraph$';
import { dispatchAction } from './action$';
import { selectGraph, updateGraph } from './GraphViz/actions';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import ListGraphs from './ListGraphs';

const Wrapper = styled.div`
  font-family: 'Helvetica';
`;

export default function App() {
  const selectedGraph = useStream(selectedGraph$, null);
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
      <ListGraphs graphs={graphs} />
      {selectedGraph && (
        <>
          <h3>Selected Graph</h3>
          <Input
            style={{ width: '600px' }}
            value={selectedGraph.name}
            onChange={event =>
              dispatchAction(updateGraph({ name: event.target.value }))
            }
          />

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
