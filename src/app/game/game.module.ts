import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './containers/game/game.component';
import { SnakeComponent } from './components/snake/snake.component';
import { reducers } from "./store/reducers/index";
import { StoreModule } from "@ngrx/store";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
  ],
  exports: [
    GameComponent,
  ],
  declarations: [GameComponent, SnakeComponent]
})
export class GameModule { }
