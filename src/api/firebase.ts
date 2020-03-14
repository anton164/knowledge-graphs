import * as firebase from 'firebase';
import { LearningGraph, RawLearningGraph } from '../GraphViz/types';
import { generateId } from '../utils';
import firebaseConfig from '../firebaseConfig';

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

const rawGraph = (graph: LearningGraph): RawLearningGraph => ({
  ...graph,
  edges: graph.edges.map(edge => ({
    id: edge.id,
    sourceId: edge.source.id,
    targetId: edge.target.id,
  })),
  nodes: graph.nodes.map(node => ({
    ...node,
  })),
});

const materializeGraph = (graph: RawLearningGraph): LearningGraph => {
  const nodes = graph.nodes.map(node => ({
    ...node,
  }));
  return {
    id: graph.id,
    name: graph.name,
    nodes,
    edges: graph.edges.map(edge => ({
      id: edge.id || generateId(),
      source: nodes.find(node => node.id === edge.sourceId)!,
      target: nodes.find(node => node.id === edge.targetId)!,
    })),
  };
};

export const writeGraphData = (graph: LearningGraph) => {
  return firebase
    .firestore()
    .collection(`graphs`)
    .doc(graph.id)
    .set(rawGraph(graph));
};

export const readOneGraph = async (id: string): Promise<LearningGraph> => {
  const doc = (await firebase
    .firestore()
    .collection(`graphs`)
    .doc(id)
    .get()) as firebase.firestore.QueryDocumentSnapshot<RawLearningGraph>;

  if (doc.exists) {
    return materializeGraph(doc.data());
  }
  throw Error('Not found');
};

export const readAllGraphs = async (): Promise<LearningGraph[]> =>
  firebase
    .firestore()
    .collection('graphs')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        console.log('Fetched', doc.data());
        return materializeGraph({
          ...doc.data(),
          id: doc.id,
        } as RawLearningGraph);
      });
    });
