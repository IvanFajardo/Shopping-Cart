import {ActionEx, CustomerActionTypes } from './customer.action';

export const initialState = [];

export function CustomerReducer(state = initialState, action: ActionEx) {
    let store;
    switch (action.type) {
        case CustomerActionTypes.Get:
          console.log('Get: ' + store);
          return action.payload ;
        
        case CustomerActionTypes.GetSuccess:
          console.log('Success: ' + action.payload);
          
          return action.payload ;
        
        case CustomerActionTypes.Update:
        //console.log('Success: ' + action.payload);
        
        return action.payload ;

        case CustomerActionTypes.UpdateSuccess:
        //console.log('Success: ' + action.payload);
        
        return action.payload ;

        default:
          return state;
    }
}


function loadState(state) {
  if (localStorage.getItem('customerItems')){
    state = JSON.parse(localStorage.getItem('customerItems'));
  }
  return state;
}
