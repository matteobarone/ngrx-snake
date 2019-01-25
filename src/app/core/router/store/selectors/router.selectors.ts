import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterState, State} from '../reducers';

export const selectRouterState = createFeatureSelector<State, RouterState>('router');
export const selectRouterId = createSelector(selectRouterState, (state: RouterState) => state.navigationId);
export const selectRouterActive = createSelector(selectRouterState, (state: RouterState) => state.state);
export const selectRouterActiveParams = createSelector(selectRouterActive, (state) => state.params);
export const selectRouterActiveUrl = createSelector(selectRouterActive, (state) => state.url);
export const selectRouterQuery = createSelector(selectRouterActive, (state) => {
  return state.queryParams;
});
