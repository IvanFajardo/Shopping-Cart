import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { InventoryActionTypes } from './inventory.action';
import { mergeMap, map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

export class InventoryEffects {
    //private databaseService: DatabaseService;
    constructor(private store: Store<string>, private action$: Actions) {}

    // @Effect() getItems$ = this.action$.pipe(
    //     ofType(InventoryActionTypes.Get),
    //     mergeMap(() => this.databaseService.getJson('items')) );
 }