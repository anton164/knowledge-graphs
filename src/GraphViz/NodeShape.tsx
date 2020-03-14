import React, { useState, useMemo, useRef } from 'react';
import {
  CardContent,
  Card,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import RootPortal from '../RootPortal';
import { Node } from './types';
import { deleteNode } from './actions';
import { dispatchAction } from '../action$';
import { useStream } from '../useStream';
import { map } from 'rxjs/operators';
import { graphProgress$ } from './graphProgress$';

type NodePopoverProps = {
  node: Node;
  position: {
    top: number;
    left: number;
  };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
const PopoverWrapper = styled.div`
  position: absolute;
  max-width: 250px;
  z-index: 1201;
  ${({ position }: Pick<NodePopoverProps, 'position'>) => `
    top: ${position.top}px;
    left: ${position.left}px;
  `}
`;
const NodePopover = ({ node, position }: NodePopoverProps) => {
  return (
    <PopoverWrapper position={position}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {node.name}
          </Typography>
          {/* <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatchAction(deleteNode(node.id))}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </PopoverWrapper>
  );
};

type NodeShapeProps = {
  node: Node;
  isSelected: boolean;
};

const NodeText = styled.h5`
  text-align: center;
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 20px auto;
`;

const colorByProgress = (progress: number | null) => {
  if (!progress) {
    return 'gray';
  } else if (progress < 25) {
    return '#ff9191';
  } else if (progress < 75) {
    return '#ffff7c';
  }
  return '#8cff8a';
};

const NodeShape = ({ node }: NodeShapeProps) => {
  const [isPopoverShown, setShowPopover] = useState(false);

  const debouncedHidePopover = useMemo(() => {
    return debounce(() => {
      setShowPopover(false);
    }, 300);
  }, []);
  const nodeProgress = useStream(
    graphProgress$.pipe(map(({ byNodeId }) => byNodeId[node.id])),
    null
  );
  const shapeRef = useRef<SVGUseElement>(null);
  const showPopover = useMemo(() => {
    return () => {
      debouncedHidePopover.cancel();
      setShowPopover(true);
    };
  }, [debouncedHidePopover]);
  const nodeRect = shapeRef.current?.getBoundingClientRect();
  // @ts-ignore
  window.shapeRef = shapeRef.current;
  const onMouseEnter = () => showPopover();
  const onMouseLeave = () => debouncedHidePopover();
  return (
    <g
      className="shape"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use
        style={{ fill: colorByProgress(nodeProgress?.progress) }}
        ref={shapeRef}
        className={'node'}
        x={-150 / 2}
        y={-150 / 2}
        width={150}
        height={150}
        xlinkHref={'#empty'}
      />
      {isPopoverShown && nodeRect && (
        <RootPortal>
          <NodePopover
            node={node}
            position={{
              top: nodeRect.bottom + window.scrollY - 10,
              left: nodeRect.right - 10,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </RootPortal>
      )}
      <foreignObject
        style={{ pointerEvents: 'none' }}
        x="-100"
        y="-30"
        width="200"
        height="50"
      >
        <NodeText>{node.name}</NodeText>
      </foreignObject>
    </g>
  );
};

export default NodeShape;
