import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './containers/game/game.component';
import { SnakeComponent } from './components/snake/snake.component';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { BlockComponent } from './components/block/block.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('game', reducers),
  ],
  exports: [
    GameComponent,
  ],
  declarations: [GameComponent, SnakeComponent, BlockComponent, BoardComponent]
})
export class GameModule { }
