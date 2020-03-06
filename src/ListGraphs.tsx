import React from 'react';
import { LearningGraph } from './GraphViz/types';
import { dispatchAction } from './action$';
import { selectGraph, createGraph } from './GraphViz/actions';
import Button from '@material-ui/core/Button';

const ListGraphs = ({ graphs }: { graphs: LearningGraph[] }) => {
  return (
    <>
      <h4>Listing graphs:</h4>
      <ul>
        {graphs.map(graph => (
          <li key={graph.id} onClick={() => dispatchAction(selectGraph(graph))}>
            {graph.name}
          </li>
        ))}
      </ul>
      <Button
        color="primary"
        onClick={() =>
          dispatchAction(
            createGraph({
              name: 'New graph',
            })
          )
        }
      >
        Create new graph
      </Button>
    </>
  );
};

export default ListGraphs;
