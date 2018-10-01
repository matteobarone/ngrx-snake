import * as fromReducer from './snake.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GameState {
  snake: fromReducer.SnakeState;
}

export const reducers: ActionReducerMap<GameState> = {
  snake: fromReducer.snakeReducer,
};
