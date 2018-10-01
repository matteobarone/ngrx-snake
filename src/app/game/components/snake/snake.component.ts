import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
