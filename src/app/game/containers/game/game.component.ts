import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameState } from '../../store/reducers';
import { SnakeState } from '../../store/reducers/snake.reducer';
import { Observable } from 'rxjs';
import * as fromAction from '../../store/actions/snake.actions';
import { SNAKE_DIRECTIONS } from '../../components/snake/snake.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public snake$: Observable<SnakeState> = this.store.pipe(select('snake'));

  constructor(private store: Store<GameState>) {
  }

  ngOnInit() {
    this.store.subscribe(console.log);
    this.store.dispatch(new fromAction.AddBlock());
    this.store.dispatch(new fromAction.SetHeadPosition([3, 4]));
    document.addEventListener('keydown', (e) => this.onKeyPressArrow(e.code));
  }

  onKeyPressArrow(code) {
    switch (code) {
      case 'ArrowUp': {
        this.store.dispatch(new fromAction.SetDirection(SNAKE_DIRECTIONS.TOP));
        return;
      }
      case 'ArrowLeft': {
        this.store.dispatch(new fromAction.SetDirection(SNAKE_DIRECTIONS.LEFT));
        return;
      }
      case 'ArrowDown': {
        this.store.dispatch(new fromAction.SetDirection(SNAKE_DIRECTIONS.BOTTOM));
        return;
      }
      case 'ArrowRight': {
        this.store.dispatch(new fromAction.SetDirection(SNAKE_DIRECTIONS.RIGHT));
        return;
      }
      default:
        return;
    }
  }

}
