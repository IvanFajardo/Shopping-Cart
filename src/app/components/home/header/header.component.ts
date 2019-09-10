import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isAuth;
  @Input() userData;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.userData);
    
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
