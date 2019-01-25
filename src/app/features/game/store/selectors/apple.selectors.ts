import { createSelector } from '@ngrx/store';

const snakeSelector = state => state.game.apple;

export const appleActiveSelector = createSelector(
  snakeSelector,
  apple => apple.activeApple,
);
