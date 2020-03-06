import React from 'react';
import { ActionDispatcher } from 'rxbeach';
import { Observable, Subscription } from 'rxjs';

export type StreamsDict<Dict extends object> = {
  [Key in keyof Dict]: Observable<Dict[Key]>;
};

export type StreamsDictOrStream<T extends object> =
  | StreamsDict<T>
  | Observable<T>
  | ((viewInstanceId: string) => Observable<T> | StreamsDict<T>);

// Necessary due to bug in typing of Object.entries
// https://github.com/Microsoft/TypeScript/issues/21826
export const streamsDictEntries = Object.entries as <T>(
  obj: T
) => [keyof T, T[keyof T]][];

let viewInstanceCounter = 1;
const getViewInstanceId = () => `view-${viewInstanceCounter++}`;

export function connect<StreamedProps extends object, OwnProps = {}>(
  WrappedComponent: React.ComponentType<StreamedProps & OwnProps>,
  streamsDictOrStream: StreamsDictOrStream<StreamedProps>
) {
  return class WithStream extends React.Component<OwnProps, StreamedProps> {
    viewInstanceId = getViewInstanceId();
    subscriptions: Set<Subscription>;
    namespacedDispatcher?: ActionDispatcher;

    constructor(props: OwnProps) {
      super(props);
      this.subscriptions = new Set();
    }

    componentDidMount() {
      if (streamsDictOrStream instanceof Observable) {
        this.subscriptions.add(
          streamsDictOrStream.subscribe(state => this.setState(state))
        );
      } else if (typeof streamsDictOrStream === 'function') {
        const resultingStreamDictOrStream = streamsDictOrStream(
          this.viewInstanceId
        );
        if (resultingStreamDictOrStream instanceof Observable) {
          this.subscriptions.add(
            resultingStreamDictOrStream.subscribe(state => this.setState(state))
          );
        } else {
          this.addStreamsFromDict(resultingStreamDictOrStream);
        }
      } else {
        this.addStreamsFromDict(streamsDictOrStream);
      }
    }

    private addStreamsFromDict(streamDict: StreamsDict<StreamedProps>) {
      streamsDictEntries(streamDict).forEach(([name, stream]) =>
        this.subscriptions.add(
          stream.subscribe(state =>
            this.setState({ [name]: state } as StreamedProps)
          )
        )
      );
    }

    componentWillUnmount() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
      this.subscriptions.clear();
    }

    render() {
      const _props = {
        ...this.state,
        ...this.props,
        viewInstanceId: this.viewInstanceId,
      };

      return this.state === null
        ? null
        : React.createElement(WrappedComponent, _props);
    }
  };
}
