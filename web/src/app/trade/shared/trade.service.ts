import { Injectable } from '@angular/core';
import { Trade } from './trade';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private trades: Trade[] = [];

  constructor(private http: HttpClient) { }

  /** GET trades from the server */
  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>('api/trades')
  }
}
