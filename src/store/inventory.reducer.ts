import {ActionEx, InventoryActionTypes } from './inventory.action';

export const initialState = [];

export function InventoryReducer(state = initialState, action: ActionEx){
    let store;
    switch (action.type) {
        case InventoryActionTypes.Get:
          store = [...state, action.payload];
          saveState('inventoryItems', store);
          return store ;
        default:
          return loadState(state);
    }
}

function saveState(token, state){
  localStorage.setItem(token, JSON.stringify(state));
}

function loadState(state) {
  if (localStorage.getItem('inventoryItems')){
    state = JSON.parse(localStorage.getItem('inventoryItems'));
  }
  return state;
}
