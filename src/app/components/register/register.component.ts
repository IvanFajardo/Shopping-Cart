import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private userForm: FormGroup;
  private errmsg;

  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required])

    });
  }

  close() {
    this.closeModal.next('signup');
  }

  checkCaptcha(): boolean {
    if (this.userForm.get('captcha').value === 'PRNU') {
      console.log('test');
      
      return true;
      
    }
    this.errmsg = 'Invalid Captcha';
    return false;
  }


  checkPass() {
    if (this.userForm.get('password').value === this.userForm.get('rePassword').value) {
      return true;
    }
    this.errmsg = 'Password Mismatch';
    return false;
  }

  

registerUser() {
  console.log('test');
  let isValid = true;

  this.databaseService.getJson('users').subscribe(data => {
    const users: any = data;
    console.log(users);
    

    users.forEach(user => {
      if (this.userForm.get('userName').value === user.userName) {
        isValid = false;
      }
    });

    if(isValid) {
      
      if (this.checkCaptcha() && this.checkPass()) {
        
        this.databaseService.addJson('users', {
          userName: this.userForm.get('userName').value,
          password: btoa(this.userForm.get('password').value)
  
        }).subscribe(() => {
          this.close();
          window.alert('Account has been created successfully');
        });
  
      } else {
        window.alert(this.errmsg);
      }
    } else {
      window.alert('Username has already been taken');
    }


  });

  }
}
