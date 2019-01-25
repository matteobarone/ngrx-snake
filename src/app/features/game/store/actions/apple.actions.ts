import { Action } from '@ngrx/store';
import { Dimension } from '../../game.interfaces';

export const SET_ACTIVE = '[APPLE]: SET ACTIVE APPLE';

export class SetActiveApple implements Action {
  readonly type = SET_ACTIVE;
  constructor(public payload: Dimension) {}
}

export type AppleActions = SetActiveApple;
