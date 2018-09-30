import * as fromActions from "../actions/snake.actions";

export interface Snake {
  blocks: number,
  direction: string,
  headPosition: number[],
}

const initialState: Snake = {
  blocks: 3,
  direction: 'RIGHT',
  headPosition: [3,3],
};

export function snakeReducer(state: Snake = initialState, action: fromActions.SnakeActions): Snake {
  switch (action.type) {
    case fromActions.ADD_BLOCK:
      return {
        ...state,
        blocks: state.blocks + 1,
      };
    default:
      return state;
  }
}
