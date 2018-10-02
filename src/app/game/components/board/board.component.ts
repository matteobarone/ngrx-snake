import { Component, Input, OnInit } from '@angular/core';
import { Dimension } from '../../game.interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() boardDimension: Dimension;
  @Input() boardBlocks: any;
  boardBlocksFormatted: any;

  ngOnInit() {
    this.boardBlocksFormatted = Object.keys(this.boardBlocks).reduce((acc, xKey) => {
      const row = Object.keys(this.boardBlocks[xKey]).reduce((internalAcc, yKey) => {
        return [...internalAcc, +this.boardBlocks[xKey][yKey].value];
      }, []);
      return [...acc, row];
    }, []);
  }
}
