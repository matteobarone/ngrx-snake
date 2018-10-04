import { GAME_STATUS } from '../../game.constants';

import * as fromStatus from '../actions';

const initialState: string = GAME_STATUS.READY;

export function statusReducer(state: string = initialState, action: fromStatus.StatusActions): string {
  switch (action.type) {
    case fromStatus.SET_STATUS: {
      return action.payload;
    }
    default:
      return state;
  }
}
