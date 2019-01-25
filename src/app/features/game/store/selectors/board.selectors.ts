import { createSelector } from '@ngrx/store';

const boardSelector = state => state.game.board;

export const boardDimensionSelector = createSelector(
  boardSelector,
  board => board.dimension,
);

export const boardBlocksSelector = createSelector(
  boardSelector,
  board => board.blocks,
);
