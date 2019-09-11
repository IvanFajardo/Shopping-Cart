import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isAuth;
  @Input() userData;
  private cart: Observable<Item[]>;
  private totalItems: number;
  constructor(private modalService: NgbModal, private store: Store<{cart: Item[]}>) {
    this.cart = store.pipe(select('cart'));
  }

  ngOnInit() {
    console.log(this.userData);
    this.cart.subscribe(item => {
      this.totalItems = item.length;

    });


  }

  openModal(content, data?) {
    this.modalService.open(content);

  }


  closeModal(content) {
    this.modalService.dismissAll(content);

  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.reload();
  }

}
