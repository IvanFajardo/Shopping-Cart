import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Store, select } from '@ngrx/store';
import { CustomerAdd} from 'src/store/customer.action';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';


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

  getItems(){
    this.databaseService.getJson('items').subscribe(data => {
      this.items = data;
      console.log(data);
      
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
    this.store.dispatch(new CustomerAdd(item));
  }

  


}
