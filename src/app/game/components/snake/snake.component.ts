import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeComponent implements OnChanges {
  @Input() snakeBlocks: number;
  arrayOfBlocks: number[];

  ngOnChanges(changes) {
    if (!changes.snakeBlocks) {
      return;
    }
    this.arrayOfBlocks = Array(changes.snakeBlocks.currentValue);
  }
}
