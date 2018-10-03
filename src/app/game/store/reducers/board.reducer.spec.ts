import { BoardService } from '../../services/board.service';
import { boardReducer, BoardState } from './board.reducer';
import { SetBusyBlock } from '../actions/board.actions';

describe('boardReducer', () => {
  it('should set a busy block', () => {

    const INITIAL_DIMENSION = 10;

    const initialState: BoardState = {
      dimension: {X: INITIAL_DIMENSION, Y: INITIAL_DIMENSION},
      blocks: BoardService.generateInitialBusyBlocks(INITIAL_DIMENSION),
    };

    const inputValue = {X: 3, Y: 4};
    const newState: BoardState = boardReducer(initialState, new SetBusyBlock({position: inputValue, value: true}));
    expect(newState.blocks[inputValue.X][inputValue.Y].value).toBe(true);
  });
});
