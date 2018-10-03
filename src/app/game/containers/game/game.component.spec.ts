import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { reducers } from '../../store/reducers';
import { StoreModule } from '@ngrx/store';
import { SnakeComponent } from '../../components/snake/snake.component';
import { BlockComponent } from '../../components/block/block.component';
import { BoardComponent } from '../../components/board/board.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GameComponent, SnakeComponent, BlockComponent, BoardComponent],
        imports: [StoreModule.forRoot(reducers)]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
