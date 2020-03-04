import { LearningGraph, Node } from './types';

const ROW_LENGTH = 200;
const SPLIT_LENGTH = 100;

const nodes: Record<string, Node> = {
  arithmetic: {
    id: 'arithmetic',
    name: 'Tall og regning',
    resources: [],
    position: {
      x: 0,
      y: 0,
    },
  },
  percent: {
    id: 'percent',
    name: 'Prosent',
    resources: [],
    position: {
      x: ROW_LENGTH,
      y: SPLIT_LENGTH,
    },
  },
  probability: {
    id: 'probability',
    name: 'Sannsynlighet',
    resources: [],
    position: {
      x: ROW_LENGTH * 2,
      y: SPLIT_LENGTH,
    },
  },
  fractions: {
    id: 'fractions',
    name: 'Brøk',
    resources: [],
    position: {
      x: ROW_LENGTH,
      y: -SPLIT_LENGTH,
    },
  },
  exp: {
    id: 'exp',
    name: 'Potenser',
    resources: [],
    position: {
      x: ROW_LENGTH * 2,
      y: -SPLIT_LENGTH,
    },
  },
  algebra: {
    id: 'algebra',
    name: 'Algebra',
    resources: [],
    position: {
      x: ROW_LENGTH * 3,
      y: -SPLIT_LENGTH * 2,
    },
  },
  stats: {
    id: 'stats',
    name: 'Statistikk',
    resources: [],
    position: {
      x: 620,
      y: 0,
    },
  },
};

export const CampusIncrementGraph: LearningGraph = {
  id: 'Qa6EI8VR6bQKehMtPlQb',
  domain: 'Mathematics (8-10 grade), Campus Inkrement',
  nodes: Object.values(nodes),
  edges: [
    {
      id: '0',
      source: nodes.arithmetic,
      target: nodes.fractions,
    },
    {
      id: '1',
      source: nodes.arithmetic,
      target: nodes.percent,
    },
    {
      id: '2',
      source: nodes.fractions,
      target: nodes.exp,
    },
    {
      id: '3',
      source: nodes.exp,
      target: nodes.algebra,
    },
    {
      id: '4',
      source: nodes.exp,
      target: nodes.stats,
    },
    {
      id: '5',
      source: nodes.percent,
      target: nodes.probability,
    },
  ],
};
