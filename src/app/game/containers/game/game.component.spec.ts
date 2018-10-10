import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { gameReducers } from '../../store/reducers';
import { StoreModule } from '@ngrx/store';
import { BlockComponent } from '../../components/block/block.component';
import { BoardComponent } from '../../components/board/board.component';
import { Dimension } from '../../game.interfaces';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GameComponent, BlockComponent, BoardComponent],
        imports: [StoreModule.forRoot(gameReducers, {
          initialState: {
            board: {
              dimension: {X: 1, Y: 1},
              blocks: {1: {1: {value: 'S'}}},
            },
            snake: {
              direction: 'TOP',
              blocks: [],
              isSettingDirection: false,
            },
            status: 'READY',
            apple: {activeApple: {X: 1, Y: 1}}
          }
        })]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.boardDimension = {X: 1, Y: 1};
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
