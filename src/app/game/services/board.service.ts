import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  static generateInitialBusyBlocks(initialDimension) {
    return Array(initialDimension).fill('').reduce((acc, el, index) => {
      const row = Array(initialDimension)
        .fill('')
        .reduce((internalAcc, internalEl, internalIndex) => {
          return {...internalAcc, [internalIndex + 1]: {value: (index === 0 && internalIndex === 0)}};
        }, {});
      return {...acc, [index + 1]: row};
    }, {});
  }
}
