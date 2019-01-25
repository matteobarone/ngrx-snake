import {Action} from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export const RouterTypes = {
  GO: '[Router] Go',
  BACK: '[Router] Back',
  FORWARD: '[Router] Forward',
};

export interface RouterGoPayload {
  path: any[];
  queryParams?: object;
  extras?: NavigationExtras;
}

export class RouterGo implements Action {
  readonly type = RouterTypes.GO;

  constructor(public payload: RouterGoPayload) {
  }
}

export class RouterBack implements Action {
  readonly type = RouterTypes.BACK;
}

export class RouterForward implements Action {
  readonly type = RouterTypes.FORWARD;
}

export type RouterActions = RouterGo | RouterBack | RouterForward;
