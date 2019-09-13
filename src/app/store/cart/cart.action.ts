
import {Action} from '@ngrx/store';
export enum CartActionTypes {
  Add = '[Cart Component] Add',
  Remove = '[Cart Component] Remove'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class CartAdd implements ActionEx {
  readonly type = CartActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class CartRemove implements ActionEx {
  readonly type = CartActionTypes.Remove;
  constructor(public payload: any) {
  }
}

