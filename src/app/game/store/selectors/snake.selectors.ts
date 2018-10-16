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

export const snakeIsSettingDirectionSelector = createSelector(
  snakeSelector,
  snake => snake.isSettingDirection,
);

export const snakeHeadSelector = createSelector(
  snakeSelector,
  snake => snake.headPosition,
);

export const snakeLength = createSelector(
  snakeBlocksSelector,
  blocks => blocks.length,
);
