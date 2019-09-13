import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CustomerActionTypes, CustomerGetSuccess, CustomerUpdateSuccess } from './customer.action';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';


export class CustomerEffects {
    
    constructor( private action$: Actions, private databaseService: DatabaseService) {}

    @Effect() getCustomer$ = this.action$.pipe(
        ofType(CustomerActionTypes.Get),
        switchMap((data: any) => this.databaseService.getJson('users', data.payload)),
        map(items => new CustomerGetSuccess(items) ) );

    @Effect() updateCustomer$ = this.action$.pipe(
        ofType(CustomerActionTypes.Update),
        switchMap((data: any) => this.databaseService.updateJson('users', data.payload.id, data.payload)),
        map((data) => new CustomerUpdateSuccess(data) ) 
        
        );
 }