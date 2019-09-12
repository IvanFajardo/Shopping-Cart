import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Store, select } from '@ngrx/store';
import { CartAdd} from 'src/app/store/cart.action';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { FormControl, Validators } from '@angular/forms';
import { InventoryGet } from 'src/app/store/inventory.action';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  private items;
  private qty;
 

  constructor(private databaseService: DatabaseService, private store: Store<{cart: Item[]}>) {
    

  }

  ngOnInit() {
    
    this.getItems();

    
  }


  showInfo(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }

  getItems(){


    this.store.dispatch(new InventoryGet(''));

    this.store.select('inventory').subscribe(data => {
      this.items = data;

      this.qty = new Array(this.items.length + 1);
      this.qty.fill(1);
      
    });
  }

  addToCart(id, name, qty, price) {
    const item = new Item();
    item.id = id;
    item.name = name;
    item.quantity = qty;
    item.price = price;
    this.store.dispatch(new CartAdd(item));
  }

  addQty(id, max) {
    if (this.qty[id] < max) {
      this.qty[id] += 1;
    }
    
  }

  removeQty(id) {
    if (this.qty[id] > 1) {
    this.qty[id] -= 1;
    }
  } 


}
