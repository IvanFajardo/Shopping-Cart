import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { CartRemove, CartCheckout, CartAdd } from 'src/app/store/cart/cart.action';
import { Observable } from 'rxjs';

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

  @Output() openModal = new EventEmitter<string>();

  constructor(private store: Store<Item[]>) {
    
    
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    
    this.store.select('cart').subscribe(data => {
      this.cart = data;
    });
    this.getTotal();
  }

  close() {
    this.closeModal.next('cart');
  }


  removeFromCart(i) {

    this.store.dispatch(new CartRemove(i));
    this.getTotal();
  }

  getTotal() {
    this.totalPrice = 0;
    this.cart.forEach(item => {
      this.totalPrice += (item.quantity * item.price);

    });
  }

  editQty(id, type) {

    let newCart = [];
    this.cart.forEach(element => {
      if (id === element.id) {
        if (type === 'add') {
          element.quantity += 1;
        }
        if (type === 'remove') { 
          if (element.quantity > 1) {
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
    if(this.userData){
      const json = {
      userId: this.userData.userName,
      date: new Date(),
      item: this.cart
      };

      this.store.dispatch(new CartCheckout(json));
      this.close();
    } else {
      this.openModal.next('login');
    }
  }

}
