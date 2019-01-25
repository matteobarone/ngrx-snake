import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState } from '../../store/reducers';
import { Dimension } from '../../game.interfaces';
import { ResetGame } from '../../store/actions';
import * as fromSnakeActions from '../../store/actions';
import * as fromBoardActions from '../../store/actions';
import * as fromStatusActions from '../../store/actions';
import * as fromAppleActions from '../../store/actions';
import * as fromSnakeSelectors from '../../store/selectors';
import * as fromBoardSelectors from '../../store/selectors';
import * as fromStatusSelectors from '../../store/selectors';
import * as fromAppleSelectors from '../../store/selectors';
import {BOARD_BUSY_SYMBOLS, GAME_STATUS, SNAKE_DIRECTIONS} from '../../game.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public boardBlocks$: Observable<any> = this.store.pipe(select(fromBoardSelectors.boardBlocksSelector));
  public boardDimension: Dimension;
  public snakeDirection: string;
  public snakeIsSettingDirection: boolean;
  public status: string;
  public activeApple: Dimension;
  public snakeLength: number;
  private headPosition: Dimension;
  private snakeBlocks: Dimension[];
  private gameInterval: any;
  private SPEED = 150;

  constructor(private store: Store<GameState>) {
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  ngOnInit() {
    this.store.subscribe(state => this.initState(state));
    this.ready();
  }

  private initState(state) {
    this.headPosition = fromSnakeSelectors.snakeHeadSelector(state);
    this.snakeDirection = fromSnakeSelectors.snakeDirectionSelector(state);
    this.snakeIsSettingDirection = fromSnakeSelectors.snakeIsSettingDirectionSelector(state);
    this.snakeBlocks = fromSnakeSelectors.snakeBlocksSelector(state);
    this.snakeLength = fromSnakeSelectors.snakeLength(state) - 1;
    this.boardDimension = fromBoardSelectors.boardDimensionSelector(state);
    this.status = fromStatusSelectors.statusSelector(state);
    this.activeApple = fromAppleSelectors.appleActiveSelector(state);
    // console.log(state);
  }

  private createGameSetInterval() {
    this.gameInterval = setInterval(() => this.onInterval(), this.SPEED);
  }

  private onInterval() {
    if (this.snakeIsOutOfBoard() || this.snakeIsHittingHimself()) {
      this.gameOver();
      return;
    }
    if (this.isSnakeEatingApple()) {
      this.addNewBlockToSnake();
      this.createApple();
      return;
    }
    if (this.snakeIsSettingDirection) {
      this.store.dispatch(new fromSnakeActions.SetIsSettingDirection(false));
    }
    this.moveSnake();
  }

  private destroyGameSetInterval() {
    clearInterval(this.gameInterval);
  }

  private ready() {
    document.addEventListener('keydown', this.onKeyPress, true);
    this.createApple();
  }

  private createApple(): void {
    this.createRandomApple().then((data: Dimension) => {
      this.store.dispatch(new fromAppleActions.SetActiveApple(data));
      this.store.dispatch(new fromBoardActions.SetBusyBlock({position: this.activeApple, value: BOARD_BUSY_SYMBOLS.APPLE}));
    });
  }

  private createRandomApple(): Promise<Dimension> {
    return new Promise((resolve) => {
      const X = this.getRandomArbitrary(1, this.boardDimension.X);
      const Y = this.getRandomArbitrary(1, this.boardDimension.Y);
      const conditionIsBlockOccupied = this.snakeBlocks.find(block => block.X === X && block.Y === Y);
      if (!conditionIsBlockOccupied) {
        resolve({X, Y});
        return;
      }
      this.createRandomApple().then((data) => {
        resolve(data);
        return;
      });
    });
  }

  public play() {
    this.store.dispatch(new fromStatusActions.SetStatus(GAME_STATUS.PLAY));
    this.createGameSetInterval();
  }

  public pause() {
    this.store.dispatch(new fromStatusActions.SetStatus(GAME_STATUS.PAUSE));
    this.destroyGameSetInterval();
  }

  public isReady() {
    return this.status === GAME_STATUS.READY;
  }

  public isPlay() {
    return this.status === GAME_STATUS.PLAY;
  }

  public isPause() {
    return this.status === GAME_STATUS.PAUSE;
  }

  public isGameOver() {
    return this.status === GAME_STATUS.GAME_OVER;
  }

  private gameOver() {
    this.destroyGameSetInterval();
    this.store.dispatch(new fromStatusActions.SetStatus(GAME_STATUS.GAME_OVER));
    document.removeEventListener('keydown', this.onKeyPress, true);
  }

  private moveSnake() {
    this.addNewBlockToSnake();
    this.removeLastBlockFromSnake();
  }

  public addNewBlockToSnake() {
    if (this.isGameFreezed()) {
      return;
    }
    const positionToAdd = this.generateNewPosition();
    this.store.dispatch(new fromSnakeActions.SetHeadPosition(positionToAdd));
    this.store.dispatch(new fromSnakeActions.AddBlock(positionToAdd));
    this.store.dispatch(new fromBoardActions.SetBusyBlock({position: positionToAdd, value: BOARD_BUSY_SYMBOLS.SNAKE}));
  }

  private removeLastBlockFromSnake() {
    this.store.dispatch(new fromBoardActions.SetBusyBlock({
      position: this.snakeBlocks[this.snakeBlocks.length - 1],
      value: BOARD_BUSY_SYMBOLS.EMPTY
    }));
    this.store.dispatch(new fromSnakeActions.RemoveLastBlock());
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

  private snakeIsHittingHimself() {
    return this.snakeBlocks
      .slice(1)
      .find(block => block.X === this.headPosition.X && block.Y === this.headPosition.Y);
  }

  private onKeyPress(e) {
    switch (e.code) {
      case 'ArrowUp':
        this.top();
        return;
      case 'ArrowLeft':
        this.left();
        return;
      case 'ArrowDown':
        this.bottom();
        return;
      case 'ArrowRight':
        this.right();
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

  public top() {
    this.setDirection(SNAKE_DIRECTIONS.TOP, SNAKE_DIRECTIONS.BOTTOM);
  }
  public bottom() {
    this.setDirection(SNAKE_DIRECTIONS.BOTTOM, SNAKE_DIRECTIONS.TOP);
  }
  public left() {
    this.setDirection(SNAKE_DIRECTIONS.LEFT, SNAKE_DIRECTIONS.RIGHT);
  }
  public right() {
    this.setDirection(SNAKE_DIRECTIONS.RIGHT, SNAKE_DIRECTIONS.LEFT);
  }

  private setDirection(newDirection: string, notAllowDirection: string): any {
    if (this.isGameFreezed()) {
      return;
    }
    if ([notAllowDirection, newDirection].includes(this.snakeDirection)) {
      return;
    }
    if (this.snakeIsSettingDirection) {
      return;
    }
    this.store.dispatch(new fromSnakeActions.SetDirection(newDirection));
    this.store.dispatch(new fromSnakeActions.SetIsSettingDirection(true));
  }

  private setStatus() {
    (this.isReady() || this.isPause()) ? this.play() : this.pause();
  }

  private isSnakeEatingApple() {
    return this.headPosition.X === this.activeApple.X && this.headPosition.Y === this.activeApple.Y;
  }

  public restart() {
    this.store.dispatch(new ResetGame());
    this.ready();
  }

  private isGameFreezed() {
    return this.isPause() || this.isGameOver();
  }

  private getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
