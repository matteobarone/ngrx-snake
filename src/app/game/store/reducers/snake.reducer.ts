import * as fromActions from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../game.constants';
import { Dimension } from '../../game.interfaces';

export interface SnakeState {
  direction: string;
  blocks: Dimension[];
  headPosition?: Dimension;
  tailPosition?: Dimension;
}

const initialState: SnakeState = {
  direction: SNAKE_DIRECTIONS.RIGHT,
  blocks: [],
};

export function snakeReducer(state: SnakeState = initialState, action: fromActions.SnakeActions): SnakeState {
  switch (action.type) {
    case fromActions.ADD_BLOCK:
      return {
        ...state,
        blocks: [action.payload, ...state.blocks],
      };
    case fromActions.REMOVE_LAST_BLOCK:
      const lastBlock = state.blocks[state.blocks.length - 1];
      return {
        ...state,
        blocks: state.blocks.filter(b => b !== lastBlock),
      };
    case fromActions.SET_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      };
    case fromActions.SET_HEAD_POSITION:
      return {
        ...state,
        headPosition: action.payload,
      };
    default:
      return state;
  }
}
