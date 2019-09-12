import {ActionEx, CartActionTypes } from './cart.action';

export const initialState = [];

export function CartReducer(state = initialState, action: ActionEx){
    let store;
    switch (action.type) {
        case CartActionTypes.Add:
          store = [...state, action.payload];
          saveState('cartItems', store);
          return store ;
        case CartActionTypes.Remove:
          store = [
            ...state.slice(0, action.payload),
            ...state.slice(action.payload + 1)
          ];
          saveState('cartItems', store);
          return store;
        default:
          return loadState(state);
    }
}

function saveState(token, state){
  localStorage.setItem(token, JSON.stringify(state));
}

function loadState(state) {
  if (localStorage.getItem('cartItems')){
    state = JSON.parse(localStorage.getItem('cartItems'));
  }
  return state;
}
