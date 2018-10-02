import { Dimension } from '../../game.interfaces';
import { Action } from '@ngrx/store';

export const SET_BUSY_BLOCK = '[BOARD]: SET BUSY BLOCK';

export class SetBusyBlock implements Action {
  readonly type = SET_BUSY_BLOCK;
  constructor(public payload: {position: Dimension, value: boolean}) {}
}

export type BoardActions = SetBusyBlock;
