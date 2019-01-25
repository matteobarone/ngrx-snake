import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterGo } from '@core/router/store/actions';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  public goToGame() {
    this.store.dispatch(new RouterGo({path: ['game']}));
  }
}
