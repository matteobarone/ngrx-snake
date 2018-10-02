import * as fromActions from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../components/snake/snake.constants';
import { Dimension } from '../../game.interfaces';

export interface SnakeState {
  blocks: Dimension[];
  direction: string;
  headPosition: Dimension;
}

const initialState: SnakeState = {
  blocks: [{X: 3, Y: 3}, {X: 2, Y: 3}, {X: 1, Y: 3}],
  direction: SNAKE_DIRECTIONS.RIGHT,
  headPosition: {X: 3, Y: 3},
};

export function snakeReducer(state: SnakeState = initialState, action: fromActions.SnakeActions): SnakeState {
  switch (action.type) {
    case fromActions.ADD_BLOCK:
      return {
        ...state,
        blocks: [action.payload, ...state.blocks],
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
