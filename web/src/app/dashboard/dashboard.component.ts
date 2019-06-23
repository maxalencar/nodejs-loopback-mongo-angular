import { Component, OnInit } from '@angular/core';
import { Trade } from '../trade/shared/trade';
import { TradeService } from '../trade/shared/trade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trades: Trade[] = [];
  displayedColumns: string[] = ['product', 'orderType', 'openingPrice', 'openingDateTime', 'closingPrice', 'closingDateTime', 'currency', 'size', 'profitLoss'];

  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    this.getTrades();
  }

  getTrades() {
    this.tradeService.getTrades().subscribe(data => {
      this.trades = data;
    });
  }

}
