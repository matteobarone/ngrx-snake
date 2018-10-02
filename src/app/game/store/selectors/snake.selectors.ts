import { createSelector } from '@ngrx/store';

const snakeSelector = state => state.game.snake;

export const snakeDirectionSelector = createSelector(
  snakeSelector,
  snake => snake.direction,
);

export const snakeHeadSelector = createSelector(
  snakeSelector,
  snake => snake.headPosition,
);
