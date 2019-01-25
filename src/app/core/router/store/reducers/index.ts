import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './router.serializer';

export * from './router.serializer';

export type RouterState = fromRouter.RouterReducerState<RouterStateUrl>;

export interface State {
  router: RouterState;
}
