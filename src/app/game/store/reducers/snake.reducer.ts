import * as fromActions from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../components/snake/snake.constants';

export interface SnakeState {
  numberOfBlocks: number;
  direction: string;
  headPosition: number[];
}

const initialState: SnakeState = {
  numberOfBlocks: 3,
  direction: SNAKE_DIRECTIONS.RIGHT,
  headPosition: [3, 3],
};

export function snakeReducer(state: SnakeState = initialState, action: fromActions.SnakeActions): SnakeState {
  switch (action.type) {
    case fromActions.ADD_BLOCK:
      return {
        ...state,
        numberOfBlocks: state.numberOfBlocks + 1,
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
