import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { CartAdd } from 'src/app/store/cart/cart.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private userForm: FormGroup;

  constructor(private databaseService: DatabaseService, private authService: AuthService, private store: Store<any>) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  close() {
    this.closeModal.next('login');
  }

  loginUser(){
    const userName = this.userForm.get('userName').value;
    const password = btoa(this.userForm.get('password').value);
    let isValid = false;

    this.databaseService.getJson('users').subscribe(data => {
      const userData: any = data;
      userData.forEach(element => {
        if (element.userName === userName && element.password === password ) {
          this.authService.loginAuthentication(userName);
          localStorage.setItem('userData', JSON.stringify(element));
          isValid = true;
          this.databaseService.getJson('cart', element.id).subscribe((cart: any) => {
            this.store.dispatch(new CartAdd(cart.items));
            // console.log(cart.items);
            
          });
          
          window.location.reload();
        } 
      });
      if (!isValid) { window.alert('Invalid Username/Password') }
    });

  }

}
