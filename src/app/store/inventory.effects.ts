import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { InventoryActionTypes, InventoryGetSuccess } from './inventory.action';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';


export class InventoryEffects {
    
    constructor( private action$: Actions, private databaseService: DatabaseService) {}

    @Effect() getItems$ = this.action$.pipe(
        ofType(InventoryActionTypes.Get),
        switchMap(() => this.databaseService.getJson('items')),
        map(items => new InventoryGetSuccess(items) ) );
 }