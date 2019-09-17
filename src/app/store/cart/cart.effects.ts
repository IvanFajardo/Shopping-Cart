import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartActionTypes, CartCheckoutSuccess } from './cart.action';
import { switchMap, map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

export class CartEffects {
    constructor(
        private store: Store<string>,
        private action$: Actions,
        private databaseService: DatabaseService) {
        
    } 


    @Effect() checkoutCart$ = this.action$.pipe(
        ofType(CartActionTypes.Checkout),
        switchMap((data: any) => this.databaseService.addJson('orders', data.payload)),
        map((data) => new CartCheckoutSuccess(data))
        );
 }