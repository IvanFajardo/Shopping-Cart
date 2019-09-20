import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseUrl: string;
  config: any;

  constructor(private http: HttpClient) { 
    this.config = JSON.parse(localStorage.getItem('Urls'));
    this.baseUrl = 'http://localhost:5000/';
    
  }

  getHeaders() {
      const headers = new HttpHeaders();
      headers.set('Content-type', 'application/json');
      
      return headers;
    }

  getJson(type,id?) {
      const headers = this.getHeaders();
      
      return this.http.get(this.baseUrl + (type + '/') + (id || ''), { headers } );
    }
    
  addJson(type, data) {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl + type ,  data  , { headers });
  }

  updateJson(type, id, data) {
    const headers = this.getHeaders();
    return this.http.put(this.baseUrl + (type + '/' + id) ,  data  , { headers });
  }

  delJson(type, id) {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + (type + '/' + id) , { headers });
  }
}
