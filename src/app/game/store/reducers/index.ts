import * as fromSnake from './snake.reducer';
import * as fromBoard from './board.reducer';
import * as fromStatus from './status.reducer';
import * as fromApple from './apple.reducer';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { GameActionTypes } from '../actions';

export interface GameState {
  apple: fromApple.AppleState;
  board: fromBoard.BoardState;
  snake: fromSnake.SnakeState;
  status: string;
}

export const gameReducers: ActionReducerMap<GameState> = {
  apple: fromApple.appleReducer,
  board: fromBoard.boardReducer,
  snake: fromSnake.snakeReducer,
  status: fromStatus.statusReducer,
};

export function resetState(reducer: ActionReducer<GameState>): ActionReducer<GameState> {
  return function(state: GameState, action: Action): GameState {
    if (action.type === GameActionTypes.RESET_GAME) {
      debugger;
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<GameState>[] = [resetState];
