import { Dimension } from '../../game.interfaces';
import { BoardActions, SET_BUSY_BLOCK } from '../actions/board.actions';

export interface BoardState {
  dimension: Dimension;
  busyBlocks: {
    [key: number]: { [key: number]: { value: boolean; } }
  };
}

const INITIAL_DIMENSION = 10;

const initialBusyBlocks = Array(INITIAL_DIMENSION).fill('').reduce((acc, el, index) => {
  const row = Array(INITIAL_DIMENSION)
    .fill('')
    .reduce((internalAcc, internalEl, internalIndex) => {
      return {...internalAcc, [internalIndex + 1]: {value: false}};
    }, {});
  return {...acc, [index + 1]: row};
}, {});

const initialStore: BoardState = {
  dimension: {X: INITIAL_DIMENSION, Y: INITIAL_DIMENSION},
  busyBlocks: initialBusyBlocks,
};

export function boardReducer(state: BoardState = initialStore, action: BoardActions): BoardState {
  switch (action.type) {
    case SET_BUSY_BLOCK: {
      return {
        ...state,
        busyBlocks: {
          ...state.busyBlocks,
          [action.payload.X]: {
            ...state.busyBlocks[action.payload.X],
            [action.payload.Y]: {
              value: true,
            }
          }
        },
      };
    }
    default:
      return state;
  }
}
