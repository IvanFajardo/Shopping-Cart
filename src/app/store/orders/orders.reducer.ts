import {ActionEx, OrdersActionTypes } from './orders.action';

export const initialState = [];

export function OrdersReducer(state = initialState, action: ActionEx) {
    let store;
    switch (action.type) {
        case OrdersActionTypes.Get:
          console.log('Get: ' + store);
          return;

        case OrdersActionTypes.GetSuccess:
          console.log('Success: ' + action.payload);

          return action.payload ;

        default:
          return state;
    }
}



