import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private userForm: FormGroup;

  constructor(private databaseService: DatabaseService, private authService: AuthService) { }

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

    this.databaseService.getJson('users').subscribe(data => {
      const userData: any = data;
      userData.forEach(element => {
        if (element.userName === userName && element.password === password ) {
          this.authService.loginAuthentication(userName);
          localStorage.setItem('userData', JSON.stringify(element));
          window.location.reload();
        }
      });
    });

  }

}
