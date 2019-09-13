import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartActionTypes } from './cart.action';

export class CartEffects {
    constructor(
        private store: Store<string>,
        private action$: Actions) {
        
    } 

//    @Effect() getItems$ = this.action$.pipe(ofType(CartActionTypes.Get))
 }