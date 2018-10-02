import { Action } from '@ngrx/store';
import { Dimension } from '../../game.interfaces';

export const ADD_BLOCK = '[SNAKE]: ADD BLOCK';
export const SET_DIRECTION = '[SNAKE]: SET DIRECTION';
export const SET_HEAD_POSITION = '[SNAKE]: SET HEAD POSITION';

export class SetDirection implements Action {
  readonly type = SET_DIRECTION;
  constructor(public payload: string) {}
}

export class SetHeadPosition implements Action {
  readonly type = SET_HEAD_POSITION;
  constructor(public payload: Dimension) {}
}

export type SnakeActions = SetDirection | SetHeadPosition;
