import { createSelector } from '@ngrx/store';

const snakeSelector = state => state.game.snake;

export const snakeBlocksSelector = createSelector(
  snakeSelector,
  snake => snake.blocks,
);

export const snakeDirectionSelector = createSelector(
  snakeSelector,
  snake => snake.direction,
);
