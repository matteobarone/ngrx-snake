import { BoardService } from '../../services/board.service';
import { boardReducer, BoardState } from './board.reducer';
import { SetBusyBlock } from '../actions/board.actions';

describe('boardReducer', () => {
  it('should set a busy block', () => {

    const DIMENSION = 10;

    const initialState: BoardState = {
      dimension: {X: DIMENSION, Y: DIMENSION},
      blocks: BoardService.generateInitialBusyBlocks(DIMENSION),
    };

    const inputValue = {X: 3, Y: 4};
    const newState: BoardState = boardReducer(initialState, new SetBusyBlock({position: inputValue, value: 'S'}));
    expect(newState.blocks[inputValue.X][inputValue.Y].value).toBe('S');
  });
});
