import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersGet } from 'src/app/store/orders/orders.action';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private orders: any[];
  private userData;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData.userName);
    this.store.dispatch(new OrdersGet('?userId=' + this.userData.userName));

    this.getOrders();

    // console.log('EZ');

  }

  getOrders() {
    this.store.select('orders').subscribe(data => {
      this.orders = data;
      console.log(this.orders);
      
    });

  }

}
