import {ActionEx, SearchActionTypes } from './search.action';

export const initialState = [];

export function SearchReducer(state = initialState, action: ActionEx){
    let store;
    switch (action.type) {
        case SearchActionTypes.Store:
          store = action.payload;
          return store ;

        default:
          return action.payload;
    }
}

