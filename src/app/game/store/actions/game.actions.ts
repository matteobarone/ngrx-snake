import { Action } from '@ngrx/store';

export const GameActionTypes = {
  RESET_GAME: '[GAME]: RESET GAME',
};

export class ResetGame implements Action {
  readonly type = GameActionTypes.RESET_GAME;
  constructor(public payload?: any) {}
}

export type GameActions = ResetGame;
