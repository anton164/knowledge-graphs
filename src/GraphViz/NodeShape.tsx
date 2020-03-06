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
  z-index: 1;
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
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </PopoverWrapper>
  );
};

type NodeShapeProps = {
  node: Node;
  isSelected: boolean;
};

const NodeText = styled.div`
  text-align: center;
`;

const NodeShape = ({ node }: NodeShapeProps) => {
  const [isPopoverShown, setShowPopover] = useState(false);

  const debouncedHidePopover = useMemo(() => {
    return debounce(() => {
      setShowPopover(false);
    }, 300);
  }, []);
  const shapeRef = useRef<SVGGElement>(null);
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
        <NodeText>
          <h5>{node.name}</h5>
        </NodeText>
      </foreignObject>
    </g>
  );
};

export default NodeShape;
