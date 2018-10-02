import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameState } from '../../store/reducers';
import * as fromSnake from '../../store/actions/snake.actions';
import * as fromBoard from '../../store/actions/board.actions';
import { SNAKE_DIRECTIONS } from '../../game.constants';
import {snakeDirectionSelector, snakeHeadSelector} from '../../store/selectors/snake.selectors';
import { Observable } from 'rxjs';
import { Dimension } from '../../game.interfaces';
import { boardBlocksSelector, boardDimensionSelector } from '../../store/selectors/board.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public boardBlocks$: Observable<any> = this.store.pipe(select(boardBlocksSelector));
  public boardDimension: Dimension;
  public snakeDirection: string;
  private headPosition: Dimension;
  private gameInterval: any;
  private SPEED: number = 1000;
  // TODO: mettere in store lo status

  constructor(private store: Store<GameState>) {
  }

  ngOnInit() {
    this.store.subscribe(console.log);
    this.initSnake();
  }

  private initSnake() {
    const initialBlock = {X: 3, Y: 4};
    this.store.dispatch(new fromSnake.SetHeadPosition(initialBlock));
    this.store.dispatch(new fromBoard.SetBusyBlock({position: initialBlock, value: true}));
    this.store.pipe(select(snakeHeadSelector)).subscribe(headPosition => {
      this.headPosition = headPosition;
    });
    this.store.pipe(select(snakeDirectionSelector)).subscribe(snakeDirection => {
      this.snakeDirection = snakeDirection;
    });
    this.store.pipe(select(boardDimensionSelector)).subscribe(boardDimension => {
      this.boardDimension = boardDimension;
    });
    document.addEventListener('keydown', (e) => this.onKeyPressArrow(e.code));
    this.createGameSetInterval();
  }

  private createGameSetInterval() {
    this.gameInterval = setInterval(() => this.onInterval(), this.SPEED);
  }

  private onInterval() {
    if (this.snakeIsOutOfBoard()) {
      console.log('Bordo!! Game over.');
      this.destroyGameSetInterval();
      return;
    }
    this.addNewBlock();
    // TODO: implementare il remove della coda (in ngrx first)
  }

  private destroyGameSetInterval() {
    clearInterval(this.gameInterval);
  }

  private addNewBlock() {
    const newPosition = this.generateNewPosition();
    this.store.dispatch(new fromSnake.SetHeadPosition(newPosition));
    this.store.dispatch(new fromBoard.SetBusyBlock({position: newPosition, value: true}));
  }

  private generateNewPosition() {
    switch (this.snakeDirection) {
      case SNAKE_DIRECTIONS.TOP:
        return {...this.headPosition, X:this.headPosition.X - 1};
      case SNAKE_DIRECTIONS.LEFT:
        return {...this.headPosition, Y:this.headPosition.Y - 1};
      case SNAKE_DIRECTIONS.BOTTOM:
        return {...this.headPosition, X:this.headPosition.X + 1};
      case SNAKE_DIRECTIONS.RIGHT:
        return {...this.headPosition, Y:this.headPosition.Y + 1};
    }
  }

  private snakeIsOutOfBoard() {
    return this.headPosition.Y <= 1 ||
      this.headPosition.Y >= this.boardDimension.Y ||
      this.headPosition.X <= 1 ||
      this.headPosition.X >= this.boardDimension.X
  }

  private onKeyPressArrow(code) {
    switch (code) {
      case 'ArrowUp': {
        this.setDirection(SNAKE_DIRECTIONS.TOP, SNAKE_DIRECTIONS.BOTTOM);
        return;
      }
      case 'ArrowLeft':
        this.setDirection(SNAKE_DIRECTIONS.LEFT, SNAKE_DIRECTIONS.RIGHT);
        return;
      case 'ArrowDown':
        this.setDirection(SNAKE_DIRECTIONS.BOTTOM, SNAKE_DIRECTIONS.TOP);
        return;
      case 'ArrowRight':
        this.setDirection(SNAKE_DIRECTIONS.RIGHT, SNAKE_DIRECTIONS.LEFT);
        return;
      default:
        return;
    }
  }

  private setDirection(newDirection: string, notAllowDirection: string): any {
    if ([notAllowDirection, newDirection].includes(this.snakeDirection)) {
      return;
    }
    this.destroyGameSetInterval();
    this.store.dispatch(new fromSnake.SetDirection(newDirection));
    this.addNewBlock();
    this.createGameSetInterval();
  }
}
