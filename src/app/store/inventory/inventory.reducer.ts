import {ActionEx, InventoryActionTypes } from './inventory.action';

export const initialState = [];

export function InventoryReducer(state = initialState, action: ActionEx){
    let store;
    switch (action.type) {
        case InventoryActionTypes.Get:
          // saveState('inventoryItems', store);

          return action.payload ;
        
        case InventoryActionTypes.GetSuccess:
          console.log('Success: ' + action.payload);
          
          return action.payload ;
        

        case InventoryActionTypes.Update:
          
        
        case InventoryActionTypes.UpdateSuccess:
          console.log('UpdateSuccess: ' + action.payload);
          
          return action.payload ;

        default:
          return state;
    }
}

// function saveState(token, state){
//   localStorage.setItem(token, JSON.stringify(state));
// }

function loadState(state) {
  if (localStorage.getItem('inventoryItems')){
    state = JSON.parse(localStorage.getItem('inventoryItems'));
  }
  return state;
}
