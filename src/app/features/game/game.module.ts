import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './containers/game/game.component';
import { gameReducers, metaReducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { BlockComponent } from './components/block/block.component';
import { BoardComponent } from './components/board/board.component';
import { GameRoutingModule } from './game-rounting.module';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    StoreModule.forFeature('game', gameReducers, { metaReducers }),
  ],
  exports: [
    GameComponent,
  ],
  declarations: [GameComponent, BlockComponent, BoardComponent]
})
export class GameModule { }
