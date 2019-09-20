import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Store, select } from '@ngrx/store';
import { CartAdd} from 'src/app/store/cart/cart.action';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { FormControl, Validators } from '@angular/forms';
import { InventoryGet, InventoryUpdate } from 'src/app/store/inventory/inventory.action';
import { map } from 'rxjs/operators';
import { isString } from 'util';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  private items = [];
  private qty;
  private cart;
  private searchInput;
  private subscription;
  private userData;

  

 

  constructor(private databaseService: DatabaseService, private store: Store<{cart: Item[]}>) {
    

  }

  ngOnInit() {
    
    this.userData = localStorage.getItem('userData');
    
    
    this.store.select('cart').subscribe(data => {
      this.cart = data;
    }
    );

    this.store.select('search').subscribe(data => {
      this.searchInput = data;
      
      
    });

    this.getItems();
    

    
  }


  showInfo(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }

  checkSearch(item) {
    // console.log(typeof this.searchInput);
    if (typeof this.searchInput !== 'string') {
      return true;
    }
    return (item.toUpperCase().includes(this.searchInput.toUpperCase()));
  }

  getItems(){

    this.store.dispatch(new InventoryGet());

    this.subscription = this.store.select('inventory').subscribe(data => {
      this.items = data;

      this.qty = new Array(this.items.length + 1);
      this.qty.fill(1);

      console.log(this.items);
      if(this.items.length > 0){
        this.subscription.unsubscribe();
      }
    });
    

  }

  addToCart(id, name, qty, price) {
    const item = new Item();
    item.id = id;
    item.name = name;
    item.quantity = qty;  
    item.price = price;
    let newCart = [];

    if(!this.userData) {
      window.alert('You must login first before adding to Cart!')
      return;
    }

    this.items.forEach(element => {
      if (id === element.id) {
        if(element.quantity > 0) {
          element.quantity -= qty;
          this.subscription.unsubscribe();
          this.store.dispatch(new InventoryUpdate(element));
        }
      }
    });

    this.cart.forEach(element => {
      if (id === element.id) {
        item.quantity = qty + element.quantity;
      } else {
        newCart.push(element);
      }

    });
    newCart.push(item);
    console.log(newCart);
    
    this.store.dispatch(new CartAdd(newCart));
    this.qty[id] = 1;
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
