import { Dimension } from '../../game.interfaces';
import { BoardActions, SET_BUSY_BLOCK } from '../actions/board.actions';
import { BoardService } from '../../services/board.service';

export interface BoardState {
  dimension: Dimension;
  busyBlocks: {
    [key: number]: { [key: number]: { value: boolean; } }
  };
}

const INITIAL_DIMENSION = 10;

const initialState: BoardState = {
  dimension: {X: INITIAL_DIMENSION, Y: INITIAL_DIMENSION},
  busyBlocks: BoardService.generateInitialBusyBlocks(INITIAL_DIMENSION),
};

export function boardReducer(state: BoardState = initialState, action: BoardActions): BoardState {
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
