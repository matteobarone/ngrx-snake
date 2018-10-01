import {SnakeState, snakeReducer} from './snake.reducer';
import { AddBlock, SetDirection, SetHeadPosition } from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../components/snake/snake.constants';

describe('snakeReducer', () => {
  let initialState: SnakeState;

  beforeEach(() => {
    initialState = {
      numberOfBlocks: 3,
      direction: SNAKE_DIRECTIONS.RIGHT,
      headPosition: [3, 3],
    };
  });

  afterEach(() => {
    initialState = null;
  });

  it('should add a block', () => {
    const expectedValue = 4;
    const newState: SnakeState = snakeReducer(initialState, new AddBlock());
    expect(newState.numberOfBlocks).toBe(expectedValue);
  });

  it('should set direction', () => {
    const expectedValue = SNAKE_DIRECTIONS.TOP;
    const newState: SnakeState = snakeReducer(initialState, new SetDirection(expectedValue));
    expect(newState.direction).toBe(expectedValue);
  });

  it('should set head position', () => {
    const expectedValue = [3, 4];
    const newState: SnakeState = snakeReducer(initialState, new SetHeadPosition(expectedValue));
    expect(newState.headPosition).toBe(expectedValue);
  });
});
