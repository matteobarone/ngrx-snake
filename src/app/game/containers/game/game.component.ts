import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState } from '../../store/reducers';
import { Dimension } from '../../game.interfaces';
import { GAME_STATUS, SNAKE_DIRECTIONS } from '../../game.constants';
import * as fromSnake from '../../store/actions';
import * as fromBoard from '../../store/actions';
import * as fromStatus from '../../store/actions';
import * as fromApple from '../../store/actions';
import { snakeBlocksSelector, snakeDirectionSelector, snakeHeadSelector } from '../../store/selectors/snake.selectors';
import { boardBlocksSelector, boardDimensionSelector } from '../../store/selectors/board.selectors';
import { statusSelector } from '../../store/selectors/state.selectors';
import { appleActiveSelector } from '../../store/selectors/apple.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public boardBlocks$: Observable<any> = this.store.pipe(select(boardBlocksSelector));
  public boardDimension: Dimension;
  public snakeDirection: string;
  public status: string;
  public activeApple: Dimension;
  private headPosition: Dimension;
  private snakeBlocks: Dimension[];
  private gameInterval: any;
  private SPEED = 100;

  constructor(private store: Store<GameState>) {
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  ngOnInit() {
    this.store.subscribe(state => this.initState(state));
    this.store.dispatch(new fromApple.SetActiveApple({X: this.getRandomArbitrary(2, 24), Y: this.getRandomArbitrary(2, 24)}));
    document.addEventListener('keydown', this.onKeyPress, true);
  }

  private initState(state) {
    this.headPosition = snakeHeadSelector(state);
    this.snakeDirection = snakeDirectionSelector(state);
    this.snakeBlocks = snakeBlocksSelector(state);
    this.boardDimension = boardDimensionSelector(state);
    this.status = statusSelector(state);
    this.activeApple = appleActiveSelector(state);
    console.log(state);
  }

  private createGameSetInterval() {
    this.gameInterval = setInterval(() => this.onInterval(), this.SPEED);
  }

  private onInterval() {
    if (this.snakeIsOutOfBoard()) {
      this.gameOver();
      return;
    }
    this.moveSnake();
  }

  private destroyGameSetInterval() {
    clearInterval(this.gameInterval);
  }

  private play() {
    this.store.dispatch(new fromStatus.SetStatus(GAME_STATUS.PLAY));
    this.createGameSetInterval();
  }

  private pause() {
    this.store.dispatch(new fromStatus.SetStatus(GAME_STATUS.PAUSE));
    this.destroyGameSetInterval();
  }

  private gameOver() {
    this.destroyGameSetInterval();
    this.store.dispatch(new fromStatus.SetStatus(GAME_STATUS.GAME_OVER));
    document.removeEventListener('keydown', this.onKeyPress, true);
  }

  private moveSnake() {
    this.addNewBlockToSnake();
    this.removeLastBlockFromSnake();
  }

  private addNewBlockToSnake() {
    if (this.isGameFreezed()) {
      return;
    }
    const positionToAdd = this.generateNewPosition();
    this.store.dispatch(new fromSnake.SetHeadPosition(positionToAdd));
    this.store.dispatch(new fromSnake.AddBlock(positionToAdd));
    this.store.dispatch(new fromBoard.SetBusyBlock({position: positionToAdd, value: true}));
  }

  private removeLastBlockFromSnake() {
    this.store.dispatch(new fromBoard.SetBusyBlock({position: this.snakeBlocks[this.snakeBlocks.length - 1], value: false}));
    this.store.dispatch(new fromSnake.RemoveLastBlock());
  }

  private generateNewPosition() {
    switch (this.snakeDirection) {
      case SNAKE_DIRECTIONS.TOP:
        return {...this.headPosition, X: this.headPosition.X - 1};
      case SNAKE_DIRECTIONS.LEFT:
        return {...this.headPosition, Y: this.headPosition.Y - 1};
      case SNAKE_DIRECTIONS.BOTTOM:
        return {...this.headPosition, X: this.headPosition.X + 1};
      case SNAKE_DIRECTIONS.RIGHT:
        return {...this.headPosition, Y: this.headPosition.Y + 1};
      default:
        return this.headPosition;
    }
  }

  private snakeIsOutOfBoard() {
    return this.headPosition.Y < 1 ||
      this.headPosition.Y > this.boardDimension.Y ||
      this.headPosition.X < 1 ||
      this.headPosition.X > this.boardDimension.X;
  }

  private onKeyPress(e) {
    switch (e.code) {
      case 'ArrowUp':
        this.setDirection(SNAKE_DIRECTIONS.TOP, SNAKE_DIRECTIONS.BOTTOM);
        return;
      case 'ArrowLeft':
        this.setDirection(SNAKE_DIRECTIONS.LEFT, SNAKE_DIRECTIONS.RIGHT);
        return;
      case 'ArrowDown':
        this.setDirection(SNAKE_DIRECTIONS.BOTTOM, SNAKE_DIRECTIONS.TOP);
        return;
      case 'ArrowRight':
        this.setDirection(SNAKE_DIRECTIONS.RIGHT, SNAKE_DIRECTIONS.LEFT);
        return;
      case 'Space':
        this.setStatus();
        return;
      case 'Enter':
        this.addNewBlockToSnake();
        return;
      default:
        return;
    }
  }

  private setDirection(newDirection: string, notAllowDirection: string): any {
    if (this.isGameFreezed()) {
      return;
    }
    if ([notAllowDirection, newDirection].includes(this.snakeDirection)) {
      return;
    }
    this.store.dispatch(new fromSnake.SetDirection(newDirection));
  }

  private setStatus() {
    (this.status === GAME_STATUS.READY || this.status === GAME_STATUS.PAUSE)
      ? this.play()
      : this.pause();
  }

  private isGameFreezed() {
    return this.status === GAME_STATUS.PAUSE || this.status === GAME_STATUS.GAME_OVER;
  }

  private getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
