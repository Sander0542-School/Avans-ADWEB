import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../../models/category";
import {Checkbook} from "../../../../models/checkbook";

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnInit {

  @Input()
  public checkbook!: Observable<Checkbook>;
  private checkbookCache!: Checkbook;

  @Input()
  public category!: Observable<Category | undefined>
  private categoryCache!: Category | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.checkbook.subscribe(value => this.checkbookCache = value);
    this.category.subscribe(value => this.categoryCache = value);
  }

}
