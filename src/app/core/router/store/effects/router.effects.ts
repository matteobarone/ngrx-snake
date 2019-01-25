import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {RouterTypes, RouterGo} from '../actions';

import {tap, map} from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {
  }

  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouterTypes.GO),
    map((action: RouterGo) => action.payload),
    tap(({path, queryParams, extras}) => {
      this.router.navigate(path, {queryParams, ...extras});
    })
  );

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.pipe(
    ofType(RouterTypes.BACK),
    tap(() => this.location.back())
  );

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.pipe(
    ofType(RouterTypes.FORWARD),
    tap(() => this.location.forward())
  );
}
