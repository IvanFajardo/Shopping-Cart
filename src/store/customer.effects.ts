import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

export class CustomerEffects {
    constructor(
        private store: Store<string>,
        private action$: Actions) {
        
    } 

   // @Effect() addToCart$ = this.action$.ofType()
}