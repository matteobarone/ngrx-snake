import { Action } from '@ngrx/store';

export const SET_STATUS = '[STATUS]: SET STATUS';

export class SetStatus implements Action {
  readonly type = SET_STATUS;
  constructor(public payload: string) {}
}

export type StatusActions = SetStatus;
