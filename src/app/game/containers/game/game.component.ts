import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameState } from '../../store/reducers';
import * as fromSnake from '../../store/actions/snake.actions';
import * as fromBoard from '../../store/actions/board.actions';
import { SNAKE_DIRECTIONS } from '../../components/snake/snake.constants';
import { snakeBlocksSelector, snakeDirectionSelector } from '../../store/selectors/snake.selectors';
import { Observable } from 'rxjs';
import { Dimension } from '../../game.interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public snakeBlocks$: Observable<Dimension> = this.store.pipe(select(snakeBlocksSelector));
  public snakeDirection$: Observable<string> = this.store.pipe(select(snakeDirectionSelector));

  constructor(private store: Store<GameState>) {
  }

  ngOnInit() {
    this.store.subscribe(console.log);
    this.initSnake();
  }

  private initSnake() {
    const initialBlock = {X: 3, Y: 4};
    this.store.dispatch(new fromSnake.AddBlock(initialBlock));
    this.store.dispatch(new fromBoard.SetBusyBlock(initialBlock));
    document.addEventListener('keydown', (e) => this.onKeyPressArrow(e.code));
  }

  private onKeyPressArrow(code) {
    switch (code) {
      case 'ArrowUp':
        this.store.dispatch(new fromSnake.SetDirection(SNAKE_DIRECTIONS.TOP));
        return;
      case 'ArrowLeft':
        this.store.dispatch(new fromSnake.SetDirection(SNAKE_DIRECTIONS.LEFT));
        return;
      case 'ArrowDown':
        this.store.dispatch(new fromSnake.SetDirection(SNAKE_DIRECTIONS.BOTTOM));
        return;
      case 'ArrowRight':
        this.store.dispatch(new fromSnake.SetDirection(SNAKE_DIRECTIONS.RIGHT));
        return;
      default:
        return;
    }
  }
}
