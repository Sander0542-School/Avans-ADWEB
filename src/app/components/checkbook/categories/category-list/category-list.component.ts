import {Component, Input, OnInit} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";
import {Category} from "../../../../models/category";
import {TableAction} from "../../checkbook-table/checkbook-table.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public readonly columns: string[] = ['name', 'description', 'actions'];

  @Input()
  public categories: Category[] = [];

  @Input()
  public actions: TableAction[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
