import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { CartRemove, CartCheckout, CartAdd } from 'src/app/store/cart/cart.action';
import { Observable } from 'rxjs';
import { InventoryUpdate } from 'src/app/store/inventory/inventory.action';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private cart;
  private totalPrice;
  private userData;
  private items;
  private subscription;
  @Output() openModal = new EventEmitter<string>();

  constructor(private store: Store<Item[]>, private databaseService: DatabaseService) {


  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.store.select('cart').subscribe(data => {
      this.cart = data;
    });

    this.subscription = this.store.select('inventory').subscribe(data => {
      this.items = data;
    });
    this.getTotal();
  }

  close() {
    this.closeModal.next('cart');
  }


  removeFromCart(i, id, qty) {
    this.editItemInventory(id, 'removeAll', qty);
    this.store.dispatch(new CartRemove(i));
    this.getTotal();
  }

  getTotal() {
    this.totalPrice = 0;
    this.cart.forEach(item => {
      this.totalPrice += (item.quantity * item.price);

    });
  }

  editItemInventory (id, type, qty?) {
    this.items.forEach(element => {
      if (id === element.id) {
        if (element.quantity >= 0) {
          if (type === 'add') {
            element.quantity -= 1;
          } else if(type === 'remove') {
              element.quantity += 1;
            } else if (type === 'removeAll') {
              console.log('nice');
              
              element.quantity += qty;
            }
          this.subscription.unsubscribe();
          this.store.dispatch(new InventoryUpdate(element));
        }
      }
    });
  }

  editQty(id, type) {

    let newCart = [];
    this.cart.forEach(element => {
      if (id === element.id) {
        if (type === 'add') {
          this.editItemInventory(id, type);
          element.quantity += 1;

        }
        if (type === 'remove') {
          if (element.quantity > 1) {
          this.editItemInventory(id, type);
          element.quantity -= 1;
          }
        }

      }
      newCart.push(element);
      // console.log(newCart);

    });

    this.store.dispatch(new CartAdd(newCart));
    this.getTotal();
  }

  checkOut() {
    if(this.userData ){
      const json = {
      userId: this.userData.userName,
      date: new Date(),
      totalPrice: this.totalPrice,
      item: this.cart
      };
      if(this.cart.length !== 0){
        this.databaseService.getJson('cart').subscribe(cart => {
          const cartData: any = cart;
         
          
          cartData.forEach(element => {
            if(element.id === this.userData.id) {
              this.databaseService.delJson('cart', this.userData.id).subscribe(); // BUG
            }
            
          });
        });

        this.store.dispatch(new CartCheckout(json));
        alert('Checkout Success!');
        
        this.close();
      }
    } else {
      this.openModal.next('login');
    }
  }

}
