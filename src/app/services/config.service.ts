import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configurations: any;

  constructor(private http: HttpClient) { }

  getConfigs() {
    console.log(this.configurations);
    return this.configurations;
  }

  loadConfigs() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config.json')
        .toPromise()
        .then(
          res => {
            this.configurations = res;
            resolve();
          }
        );
    });
   }
}

export function loadConfigurations(configService: ConfigService) {
  return () => configService.loadConfigs();
}
