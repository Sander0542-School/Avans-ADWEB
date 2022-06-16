import {Component, Input} from '@angular/core';
import {Category} from "../../../../models/category";
import {Observable} from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  public readonly columns: string[] = ['name', 'description', 'actions'];

  @Input()
  public categories!: Observable<Category[]>;

  @Input()
  public actions: TableAction[] = [];

  constructor() {
  }
}

export type TableAction = {
  name: string,
  action: (checkbook: Category) => void,
  disabled?: (checkbook: Category) => boolean
}
