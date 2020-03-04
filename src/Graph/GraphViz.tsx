import React from 'react';
import styled from 'styled-components';
import { LearningGraph } from './types';
import { GraphView, INode, IEdge } from 'react-digraph';
import {
  updateNode,
  createNode,
  createEdge,
  selectEdge,
  selectNode,
} from './actions';
import { dispatchAction } from '../action$';
import { generateId } from '../utils';

interface GraphVizProps {
  graph: LearningGraph;
}

type ContainerProps = {
  padding?: string | 0;
  margin?: string | 0;
};

const Container = styled.div<ContainerProps>`
  padding: ${props => ('padding' in props ? props.padding : '0')};
  margin: ${props => ('margin' in props ? props.margin : 0)};
`;

const NodeText = styled.div`
  text-align: center;
`;

const NODE_KEY = 'id';

const GraphConfig = {
  NodeTypes: {
    empty: {
      // required to show empty nodes
      // typeText: 'None',
      shapeId: '#empty', // relates to the type property of a node
      shape: (
        <symbol
          viewBox="0 0 100 100"
          width="150"
          height="150"
          id="empty"
          key="0"
        >
          <circle cx="50" cy="50" r="35"></circle>
        </symbol>
      ),
    },
    custom: {
      // required to show empty nodes
      // typeText: 'Custom',
      shapeId: '#custom', // relates to the type property of a node
      shape: (
        <symbol viewBox="-30 -30 100 100" id="custom" key="0">
          <ellipse cx="20" cy="25" rx="50" ry="25"></ellipse>
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: '#emptyEdge',
      shape: (
        <symbol viewBox="0 0 30 50" id="emptyEdge" key="0">
          {/* <circle cx="25" cy="25" r="8" fill="currentColor">
            {' '}
          </circle> */}
        </symbol>
      ),
    },
  },
};

const GraphViz = ({ graph }: GraphVizProps) => {
  const nodes: INode[] = graph.nodes.map(node => {
    return {
      title: node.name,
      id: node.id,
      x: node.position.x,
      y: node.position.y,
      type: 'empty',
    };
  });
  const edges: IEdge[] = graph.edges.map(edge => {
    return {
      id: edge.id,
      source: edge.source.id,
      target: edge.target.id,
      type: 'emptyEdge',
    };
  });
  const noop = () => {};
  return (
    <Container>
      <div style={{ width: 800, height: 500 }}>
        <GraphView
          // ref="GraphView"
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={{}}
          renderNodeText={({ title }) => {
            return (
              <foreignObject x="-100" y="-30" width="200" height="50">
                <NodeText>
                  <h5>{title}</h5>
                </NodeText>
              </foreignObject>
            );
          }}
          nodeTypes={GraphConfig.NodeTypes}
          nodeSubtypes={GraphConfig.NodeSubtypes}
          edgeTypes={GraphConfig.EdgeTypes}
          onSelectNode={node => node && dispatchAction(selectNode(node.id))}
          onCreateNode={(x, y) => {
            dispatchAction(
              createNode({
                name: 'New node',
                position: {
                  x,
                  y,
                },
              })
            );
          }}
          onUpdateNode={node => {
            const position =
              node.x && node.y
                ? {
                    x: node.x,
                    y: node.y,
                  }
                : undefined;
            dispatchAction(
              updateNode({
                id: node.id,
                diff: { position },
              })
            );
          }}
          onDeleteNode={noop}
          onSelectEdge={edge => dispatchAction(selectEdge(edge.id))}
          onCreateEdge={(sourceNode, targetNode) => {
            dispatchAction(
              createEdge({ sourceId: sourceNode.id, targetId: targetNode.id })
            );
          }}
          onSwapEdge={noop}
          onDeleteEdge={noop}
        />
      </div>
    </Container>
  );
};

export default GraphViz;
