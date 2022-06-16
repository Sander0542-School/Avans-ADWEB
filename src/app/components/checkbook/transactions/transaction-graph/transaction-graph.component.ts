import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Transaction} from "../../../../models/transaction";

@Component({
  selector: 'app-transaction-graph',
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.scss']
})
export class TransactionGraphComponent implements OnChanges {

  view: any = [700, 400];
  schema: any = {
    domain: ['#3f51b5']
  }

  @Input()
  public transactions: Transaction[] = [];

  public transactionGraphData: any[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.updateGraph();
    }
  }

  updateGraph(): void {
    if (this.transactions.length == 0) {
      this.transactionGraphData = [];
      return;
    }

    const mapData = new Map<number, number>();

    const month = this.getMonth(this.transactions[0].datetime.toDate());
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
    for (let d = month; d < nextMonth; d.setDate(d.getDate() + 1)) {
      mapData.set(d.getDate(), 0);
    }

    for (let transaction of this.transactions) {
      const date = transaction.datetime.toDate().getDate();
      mapData.set(date, (mapData.get(date) ?? 0) + transaction.value);
    }

    const series: Object[] = [];
    let start = 0;
    for (let [date, value] of mapData) {
      start += value;
      series.push({
        name: date,
        value: start
      });
    }

    this.transactionGraphData = [{
      name: 'Transactions',
      series: series
    }];
  }

  private getMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}


