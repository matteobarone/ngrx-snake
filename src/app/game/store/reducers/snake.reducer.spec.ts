import {SnakeState, snakeReducer} from './snake.reducer';
import { SetDirection, SetHeadPosition } from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../game.constants';

describe('snakeReducer', () => {
  let initialState: SnakeState;

  beforeEach(() => {
    initialState = {
      direction: SNAKE_DIRECTIONS.RIGHT,
      headPosition: {X: 3, Y: 3},
    };

  });

  afterEach(() => {
    initialState = null;
  });

  it('should set direction', () => {
    const expectedValue = SNAKE_DIRECTIONS.TOP;
    const newState: SnakeState = snakeReducer(initialState, new SetDirection(expectedValue));
    expect(newState.direction).toBe(expectedValue);
  });

  it('should set head position', () => {
    const expectedValue = {X: 3, Y: 4};
    const newState: SnakeState = snakeReducer(initialState, new SetHeadPosition(expectedValue));
    expect(newState.headPosition).toEqual(expectedValue);
  });
});
