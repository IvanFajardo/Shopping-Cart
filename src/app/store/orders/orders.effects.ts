import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { OrdersActionTypes, OrdersGetSuccess } from './orders.action';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';


export class OrdersEffects {
    
    constructor( private action$: Actions, private databaseService: DatabaseService) {}

    @Effect() getOrders$ = this.action$.pipe(
        ofType(OrdersActionTypes.Get),
        switchMap((data: any) => this.databaseService.getJson('orders', data.payload)),
        map(items => new OrdersGetSuccess(items) ) );

 }