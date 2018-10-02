import * as fromSnake from './snake.reducer';
import * as fromBoard from './board.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GameState {
  snake: fromSnake.SnakeState;
  board: fromBoard.BoardState;
}

export const reducers: ActionReducerMap<GameState> = {
  snake: fromSnake.snakeReducer,
  board: fromBoard.boardReducer,
};
