import * as fromSnake from './snake.reducer';
import * as fromBoard from './board.reducer';
import * as fromStatus from './status.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GameState {
  board: fromBoard.BoardState;
  snake: fromSnake.SnakeState;
  status: string;
}

export const reducers: ActionReducerMap<GameState> = {
  board: fromBoard.boardReducer,
  snake: fromSnake.snakeReducer,
  status: fromStatus.statusReducer,
};
