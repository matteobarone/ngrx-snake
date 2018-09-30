import { Action } from "@ngrx/store";

export const ADD_BLOCK = '[SNAKE]: ADD BLOCK';

export class AddBlock implements Action {
  readonly type = ADD_BLOCK;
}

export type SnakeActions = AddBlock;
