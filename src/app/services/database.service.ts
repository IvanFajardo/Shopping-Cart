import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseUrl: string;
  config: any;

  constructor(private http: HttpClient, configService: ConfigService) { 
    this.config = configService.getConfigs(); 
    this.baseUrl = this.config.baseUrl;
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
    return this.http.post(this.baseUrl + (type + '/') ,  data  , { headers });
  }
}
