import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameModule } from './features/game/game.module';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [GameModule, StoreModule.forRoot({})],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
