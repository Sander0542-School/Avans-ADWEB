import {Component, Input, OnInit} from '@angular/core';
import {Observable, combineLatest} from "rxjs";
import {Transaction} from "../../../../models/transaction";
import {Category} from "../../../../models/category";

@Component({
  selector: 'app-category-graph',
  templateUrl: './category-graph.component.html',
  styleUrls: ['./category-graph.component.scss']
})
export class CategoryGraphComponent implements OnInit {

  view: any = [700, 400];
  schema: any = {
    domain: ['#3f51b5']
  }

  @Input()
  public transactions!: Observable<Transaction[]>;

  @Input()
  public categories!: Observable<Category[]>;

  public graphData!: object[];

  constructor() {
  }

  ngOnInit(): void {
    combineLatest([this.categories, this.transactions]).subscribe(([categories, transactions]) => {
      this.graphData = CategoryGraphComponent.parseTransactions(categories, transactions);
    })
  }

  private static parseTransactions(categories: Category[], transactions: Transaction[]) {
    const categoryMap = new Map<string, Category>(categories.map(category => [category.id, category]));
    const categorySums = new Map<string, number>(categories.map(category => [category.id, 0]));
    for (let transaction of transactions) {
      if (transaction.categoryId) categorySums.set(transaction.categoryId, (categorySums.get(transaction.categoryId) ?? 0) + transaction.value);
    }

    return Array.from(categorySums).map(([categoryId, value]) => {
      return {
        name: categoryMap.get(categoryId)?.name ?? "",
        series: [{
          name: "Amount",
          value: value
        }]
      }
    })
  }

}
