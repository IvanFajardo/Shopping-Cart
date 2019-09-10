import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private userForm: FormGroup;

  constructor(private databaseService: DatabaseService) { }

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

    return false;
  }


  checkPass() {
    if (this.userForm.get('password').value === this.userForm.get('rePassword').value) {
      return true;
    }

    return false;
  }

  registerUser() {
    console.log('test');
    
    if (this.checkCaptcha()) {

      this.databaseService.addJson('users', {
        userName: this.userForm.get('userName').value,
        password: btoa(this.userForm.get('password').value)

      }).subscribe();

    }  }
}
