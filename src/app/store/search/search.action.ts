
import {Action} from '@ngrx/store';
export enum SearchActionTypes {
  Store = 'Store Search Input'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class SearchStore implements ActionEx {
  readonly type = SearchActionTypes.Store;
  constructor(public payload: any) {
  }
}




