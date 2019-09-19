import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { SearchStore } from 'src/app/store/search/search.action';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isAuth;
  @Input() userData;
  @ViewChild('login', {static: true}) private login;
  private cart: Observable<Item[]>;
  private totalItems: number;
  private searchInput;
  constructor(
    private modalService: NgbModal,
    private store: Store<{cart: Item[]}>,
    private router: Router,
    private authService: AuthService,
    private databaseService: DatabaseService ) {
    this.cart = store.select('cart');
  }

  ngOnInit() {
    if (!this.userData) {
      this.openModal(this.login);
    }
    this.searchInput = '';
    this.search();
    console.log(this.userData);
    this.cart.subscribe(item => {
      if (item) {
        this.totalItems = item.length;
      } else {
        this.totalItems = 0;
      }

    });


  }

  openModal(content) {

    console.log(content);

    this.modalService.open(content, {size: 'lg'});

  }


  closeModal(content) {
    this.modalService.dismissAll(content);

  }


  logout() {
    this.cart.subscribe(data => {
      const cart = {
        id: this.userData.id,
        userId: this.userData.userName,
        items: data
      };

      this.databaseService.getJson('cart').subscribe(cartItems => {
        const arrCartItems: any = cartItems;
        let hasCart = false;

        arrCartItems.forEach(element => {
          if (element.id === this.userData.id) {
            hasCart = true;
          }
        });

        if (hasCart) {
          this.databaseService.updateJson('cart',this.userData.id, cart).subscribe();
        } else {
          this.databaseService.addJson('cart', cart).subscribe();
        }
        

      });
    });


    this.authService.logout();
    window.location.reload();
  }

  search() {
    this.store.dispatch(new SearchStore(this.searchInput));
    this.router.navigate(['home']);




  }

}
