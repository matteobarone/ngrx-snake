import * as fromActions from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../components/snake/snake.constants';
import { Dimension } from '../../game.interfaces';

export interface SnakeState {
  blocks: Dimension[];
  direction: string;
}

const initialState: SnakeState = {
  blocks: [],
  direction: SNAKE_DIRECTIONS.RIGHT,
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
    default:
      return state;
  }
}
