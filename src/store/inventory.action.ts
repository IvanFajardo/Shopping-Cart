import {Action} from '@ngrx/store';
export enum InventoryActionTypes {
  Get = '[Inventory Component] Get'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class InventoryGet implements ActionEx {
  readonly type = InventoryActionTypes.Get;
  constructor(public payload: any) {
  }
}


