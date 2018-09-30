import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {GameState} from "../../store/reducers/index";
import {Snake} from "../../store/reducers/snake.reducer";
import {Observable} from "rxjs/index";
import {AddBlock} from "../../store/actions/snake.actions";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public snake$: Observable<Snake> = this.store.pipe(select('snake'));

  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    this.store.subscribe(console.log);
    this.store.dispatch(new AddBlock());
  }

}
