import { Subject } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { UnknownAction } from 'rxbeach/internal';
import { ActionStream } from 'rxbeach';
import { share } from 'rxjs/operators';

const actionSubject$ = new Subject<UnknownAction>();

export const action$: ActionStream = actionSubject$.pipe(
  tag('action$'),
  share()
);

export const dispatchAction = (action: UnknownAction) =>
  actionSubject$.next(action);
