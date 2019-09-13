import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomerGet, CustomerUpdate } from 'src/app/store/customer/customer.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  @Input() userData;
  private onEdit;
  private onChangePass;
  private profileForm: FormGroup;
  private passForm: FormGroup;
  private customerData;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.getCustomer(this.userData.id);
    this.onEdit = this.onChangePass = false;
    this.passForm = new FormGroup({
      oldPass: new FormControl(''),
      newPass: new FormControl(''),
      rePass: new FormControl('')
    });
  }

  getCustomer(id){
    this.store.dispatch(new CustomerGet(id));

    this.store.select('customer').subscribe(data => {
      this.customerData = data; 
      
      this.profileForm = new FormGroup({
        name: new FormControl(this.customerData.name || ''),
        address: new FormControl(this.customerData.address || ''),
        paymentMethod: new FormControl(this.customerData.paymentMethod || '')
      });
      
    });
  }

  updateCustomer(id) {
    this.store.dispatch(new CustomerUpdate({
      id: id,
      userName: this.userData.userName,
      password: this.userData.password,
      name: this.profileForm.get('name').value,
      address: this.profileForm.get('address').value,
      paymentMethod: this.profileForm.get('paymentMethod').value
    }));
  }

  close() {
    this.closeModal.next('profile');
  }

  toggleOnEdit(){
    this.onEdit = !this.onEdit;
  }

  saveChanges() {
    this.toggleOnEdit();
    this.updateCustomer(this.userData.id);
  }

  toggleOnChangePass() {
    this.onChangePass = !this.onChangePass;
  }

  verifyPass(): boolean{
    if (this.userData.password === btoa(this.passForm.get('oldPass').value)) {
      if(this.passForm.get('newPass').value === this.passForm.get('rePass').value) {
        return true;
      }
    }

    return false;
  }

  changePass() {
    if(this.verifyPass()){
      this.store.dispatch(new CustomerUpdate({
        id: this.customerData.id,
        userName: this.customerData.userName,
        password: btoa(this.passForm.get('newPass').value),
        name: this.customerData.name,
        address: this.customerData.address,
        paymentMethod: this.customerData.paymentMethod
      }));
    }
  }
}
