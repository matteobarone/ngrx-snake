import { Dimension } from '../../game.interfaces';
import * as fromApple from '../actions';

export interface AppleState {
  activeApple?: Dimension;
}

const initialState: AppleState = {};

export function appleReducer(state: AppleState = initialState, action: fromApple.AppleActions): AppleState {
  switch (action.type) {
    case fromApple.SET_ACTIVE: {
      return {
        ...state,
        activeApple: action.payload
      };
    }
    default:
      return state;
  }
}
