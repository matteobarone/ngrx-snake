import { Injectable } from '@angular/core';
import {BOARD_BUSY_SYMBOLS} from "../game.constants";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  // todo: refactor better
  static generateInitialBusyBlocks(initialDimension) {
    return Array(initialDimension).fill('').reduce((acc, el, index) => {
      const row = Array(initialDimension)
        .fill('')
        .reduce((internalAcc, internalEl, internalIndex) => {
          return {
            ...internalAcc,
            [internalIndex + 1]: {
              value: (index === 0 && internalIndex === 0)
                ? BOARD_BUSY_SYMBOLS.SNAKE
                : BOARD_BUSY_SYMBOLS.EMPTY,
            }
          };
        }, {});
      return {...acc, [index + 1]: row};
    }, {});
  }
}
