import {Action} from '@ngrx/store';
export enum InventoryActionTypes {
  Get = '[Inventory Component] Get',
  GetSuccess = '[Inventory Component] GetSuccess'
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

export class InventoryGetSuccess implements ActionEx {
  readonly type = InventoryActionTypes.GetSuccess;
  constructor(public payload: any) {
  }
}


