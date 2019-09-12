import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  private onEdit;
  private onChangePass;

  constructor() { }

  ngOnInit() {
    this.onEdit = this.onChangePass = false;
  }

  close() {
    this.closeModal.next('login');
  }

  toggleOnEdit(){
    this.onEdit = !this.onEdit;
  }

  saveChanges(){
    this.toggleOnEdit();
  }

  changePass(){
    this.onChangePass = !this.onChangePass;
  }
}
