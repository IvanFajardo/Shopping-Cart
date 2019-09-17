import {Action} from '@ngrx/store';
export enum OrdersActionTypes {
  Get = '[Orders Component] Get',
  GetSuccess = '[Orders Component] GetSuccess',
  Update = '[Orders Component] Update',
  UpdateSuccess = '[Orders Component] UpdateSuccess',

}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class OrdersGet implements ActionEx {
  readonly type = OrdersActionTypes.Get;
  constructor(public payload: any) {
  }
}

export class OrdersGetSuccess implements ActionEx {
  readonly type = OrdersActionTypes.GetSuccess;
  constructor(public payload: any) { 
  }
}



