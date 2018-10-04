import * as fromSnake from './snake.reducer';
import * as fromBoard from './board.reducer';
import * as fromStatus from './status.reducer';
import * as fromApple from './apple.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GameState {
  apple: fromApple.AppleState;
  board: fromBoard.BoardState;
  snake: fromSnake.SnakeState;
  status: string;
}

export const reducers: ActionReducerMap<GameState> = {
  apple: fromApple.appleReducer,
  board: fromBoard.boardReducer,
  snake: fromSnake.snakeReducer,
  status: fromStatus.statusReducer,
};
