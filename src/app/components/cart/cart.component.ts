import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { CartRemove } from 'src/app/store/cart/cart.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private cart: Observable<Item[]>;
  private totalPrice;

  constructor(private store: Store<Item[]>) {
    
    this.cart = store.pipe(select('cart'));
  }

  ngOnInit() {

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
    this.cart.subscribe(cart => {
      cart.forEach(item => {
        this.totalPrice += (item.quantity * item.price);

      });
    });


  }

}
