import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import {BOARD_BUSY_SYMBOLS} from "../../game.constants";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() boardBlocks: any;
  activeBoard: any;
  rows: string[];
  cols: string[];
  boardBusySymbol: any;

  ngOnInit() {
    this.rows = Object.keys(this.boardBlocks);
    this.cols = Object.keys(this.boardBlocks[1]);
    this.boardBusySymbol = BOARD_BUSY_SYMBOLS;
  }

  ngOnChanges(changes) {
    if (!changes.boardBlocks.currentValue) {
      return;
    }
    this.activeBoard = changes.boardBlocks.currentValue;
  }

  trackByFn(index) {
    return index;
  }
}
