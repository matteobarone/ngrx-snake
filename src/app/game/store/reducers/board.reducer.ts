import { Dimension } from '../../game.interfaces';
import * as fromBoard from '../actions';
import { BoardService } from '../../services/board.service';

// TODO: create interfaccia per i blocks
export interface BoardState {
  dimension: Dimension;
  blocks: {
    [key: number]: { [key: number]: { value: string; } }
  };
}

const INITIAL_DIMENSION = 24;

const initialState: BoardState = {
  dimension: {X: INITIAL_DIMENSION, Y: INITIAL_DIMENSION},
  blocks: BoardService.generateInitialBusyBlocks(INITIAL_DIMENSION),
};

export function boardReducer(state: BoardState = initialState, action: fromBoard.BoardActions): BoardState {
  switch (action.type) {
    case fromBoard.SET_BUSY_BLOCK: {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          [action.payload.position.X]: {
            ...state.blocks[action.payload.position.X],
            [action.payload.position.Y]: {
              value: action.payload.value,
            }
          }
        },
      };
    }
    default:
      return state;
  }
}
