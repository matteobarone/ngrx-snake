import * as fromSnake from '../actions';
import { SNAKE_DIRECTIONS } from '../../game.constants';
import { Dimension } from '../../game.interfaces';

export interface SnakeState {
  direction: string;
  blocks: Dimension[];
  headPosition?: Dimension;
}

const initialState: SnakeState = {
  direction: SNAKE_DIRECTIONS.RIGHT,
  blocks: [{X: 1, Y: 1}],
  headPosition: {X: 1, Y: 1},
};

export function snakeReducer(state: SnakeState = initialState, action: fromSnake.SnakeActions): SnakeState {
  switch (action.type) {
    case fromSnake.ADD_BLOCK:
      return {
        ...state,
        blocks: [action.payload, ...state.blocks],
      };
    case fromSnake.REMOVE_LAST_BLOCK:
      const lastBlock = state.blocks[state.blocks.length - 1];
      return {
        ...state,
        blocks: state.blocks.filter(b => b !== lastBlock),
      };
    case fromSnake.SET_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      };
    case fromSnake.SET_HEAD_POSITION:
      return {
        ...state,
        headPosition: action.payload,
      };
    default:
      return state;
  }
}
