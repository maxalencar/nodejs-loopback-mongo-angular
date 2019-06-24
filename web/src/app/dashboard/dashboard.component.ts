import { Component, OnInit, ViewChild } from '@angular/core';
import { Trade } from '../trade/shared/trade';
import { TradeService } from '../trade/shared/trade.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['product', 'orderType', 'openingPrice', 'openingDateTime', 'closingPrice', 'closingDateTime', 'currency', 'size', 'profitLoss'];
  dataSource = new MatTableDataSource<Trade>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTrades();
  }

  getTrades() {
    this.tradeService.getTrades().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}
