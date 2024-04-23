import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ApiResponse, ApiResponseCategory, Drink } from '../models/drink.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAlcoholicDrinks(): Observable<Drink[]> {
    return this.configService.getConfig().pipe(
      map((config) => config.apiUrl),
      switchMap((url) => this.http.get<any>(url)),
      map((data) => data.drinks as Drink[])
    );
  }
  getAlcoholicDrinkById(id: string): Observable<ApiResponse> {
    return this.configService.getConfig().pipe(
      switchMap((config) => {
        const apiUrl = config.apiUrlWithId.replace('{id}', id);
        return this.http.get<ApiResponse>(apiUrl);
      })
    );
  }
}
