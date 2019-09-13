import {Action} from '@ngrx/store';
export enum CustomerActionTypes {
  Get = '[Customer Component] Get',
  GetSuccess = '[Customer Component] GetSuccess',
  Update = '[Customer Component] Update',
  UpdateSuccess = '[Customer Component] UpdateSuccess',

}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class CustomerGet implements ActionEx {
  readonly type = CustomerActionTypes.Get;
  constructor(public payload: any) {
  }
}

export class CustomerGetSuccess implements ActionEx {
  readonly type = CustomerActionTypes.GetSuccess;
  constructor(public payload: any) { 
  }
}

export class CustomerUpdateSuccess implements ActionEx {
    readonly type = CustomerActionTypes.UpdateSuccess;
    constructor(public payload: any) { 
    }
  }

export class CustomerUpdate implements ActionEx {
  readonly type = CustomerActionTypes.Update;
  constructor(public payload: any) { 
  }
}


