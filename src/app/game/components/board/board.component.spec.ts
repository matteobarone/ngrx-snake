import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { BlockComponent } from '../block/block.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [BoardComponent, BlockComponent],
        imports: [StoreModule.forRoot(reducers)]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.boardBlocks = {1: {1: {value: false}}};
    component.rows = ['1'];
    component.cols = ['1'];
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
