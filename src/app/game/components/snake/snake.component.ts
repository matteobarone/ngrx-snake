import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dimension } from '../../game.interfaces';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeComponent {
  @Input() snakeBlocks: Dimension[];
}
