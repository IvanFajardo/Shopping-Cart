import {Action} from '@ngrx/store';
export enum InventoryActionTypes {
  Get = '[Inventory Component] Get',
  GetSuccess = '[Inventory Component] GetSuccess',
  Update = '[Inventory Component] Update',
  UpdateSuccess = '[Inventory Component] UpdateSuccess'
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

export class InventoryUpdate implements ActionEx {
  readonly type = InventoryActionTypes.Update;
  constructor(public payload: any) {
  }
}

export class InventoryUpdateSuccess implements ActionEx {
  readonly type = InventoryActionTypes.UpdateSuccess;
  constructor(public payload: any) {
  }
}


