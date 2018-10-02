import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Dimension } from '../../game.interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() boardDimension: Dimension;
  @Input() boardBlocks: any;
  boardBlocksFormatted: any;

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.boardBlocks.currentValue) {
      this.boardBlocksFormatted = Object.keys(changes.boardBlocks.currentValue).reduce((acc, xKey) => {
        const row = Object.keys(changes.boardBlocks.currentValue[xKey]).reduce((internalAcc, yKey) => {
          return [...internalAcc, +changes.boardBlocks.currentValue[xKey][yKey].value];
        }, []);
        return [...acc, row];
      }, []);
    }
  }
}
