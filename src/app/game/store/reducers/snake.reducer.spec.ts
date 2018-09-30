import {Snake, snakeReducer} from "./snake.reducer";
import {AddBlock} from "../actions/snake.actions";

describe('snakeReducer', () => {
  it('should add a block', () => {
    const initialState: Snake = {
      blocks: 3,
      direction: 'RIGHT',
      headPosition: [3,3],
    };
    const newState: Snake = snakeReducer(initialState, new AddBlock());
    expect(newState.blocks).toBe(4);

    // console.log('add block');
  })
});
