import {SnakeState, snakeReducer} from './snake.reducer';
import { AddBlock, SetDirection } from '../actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../game.constants';

describe('snakeReducer', () => {
  let initialState: SnakeState;

  beforeEach(() => {
    initialState = {
      blocks: [{X: 3, Y: 3}, {X: 3, Y: 2}, {X: 3, Y: 1}],
      direction: SNAKE_DIRECTIONS.RIGHT,
    };
  });

  afterEach(() => {
    initialState = null;
  });

  it('should add a block', () => {
    const expectedValue = [{X: 3, Y: 4}, {X: 3, Y: 3}, {X: 3, Y: 2}, {X: 3, Y: 1}];
    const newState: SnakeState = snakeReducer(initialState, new AddBlock({X: 3, Y: 4}));
    expect(newState.blocks).toEqual(expectedValue);
  });

  it('should set direction', () => {
    const expectedValue = SNAKE_DIRECTIONS.TOP;
    const newState: SnakeState = snakeReducer(initialState, new SetDirection(expectedValue));
    expect(newState.direction).toBe(expectedValue);
  });
});
