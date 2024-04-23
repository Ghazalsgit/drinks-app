import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../models/drink.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl);
  }
}
