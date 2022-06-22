import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Transaction} from "../../../../models/transaction";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-transaction-graph',
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.scss']
})
export class TransactionGraphComponent implements OnInit {

  view: any = [700, 400];
  schema: any = {
    domain: ['#3f51b5']
  }

  @Input()
  public transactions!: Observable<Transaction[]>;

  public graphData!: object[];

  constructor() {
  }

  ngOnInit(): void {
    this.transactions.subscribe(value => {
      this.graphData = TransactionGraphComponent.parseTransactions(value);
    })
  }

  private static parseTransactions(transactions: Transaction[]): any {
    if (transactions.length == 0) return [];

    const dateValues = TransactionGraphComponent.getDaysInMonth(transactions[0].datetime.toDate());

    for (let transaction of transactions) {
      const date = transaction.datetime.toDate().getDate();
      dateValues.set(date, (dateValues.get(date) ?? 0) + transaction.value);
    }

    return [{
      name: 'Amount',
      series: TransactionGraphComponent.calculateMonth(dateValues)
    }];
  }

  private static getDaysInMonth(date: Date) {
    const mapData = new Map<number, number>();

    const month = TransactionGraphComponent.getMonth(date);
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
    for (let d = month; d < nextMonth; d.setDate(d.getDate() + 1)) {
      mapData.set(d.getDate(), 0);
    }

    return mapData;
  }

  private static calculateMonth(dateValues: Map<number, number>) {
    const series: Object[] = [];
    let start = 0;
    for (const [date, value] of dateValues) {
      start += value;
      series.push({
        name: date,
        value: start
      });
    }

    return series;
  }

  private static getMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}


