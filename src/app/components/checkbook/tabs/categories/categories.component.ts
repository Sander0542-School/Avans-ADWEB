import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";
import {orderBy, Unsubscribe, where} from "@angular/fire/firestore";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnChanges {

  @Input()
  public checkbook: Checkbook = {} as Checkbook;

  public categories: Category[] = [];

  private categoryUnsubscribe: Unsubscribe | undefined;

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkbook']) {
      this.updateCategories();
    }
  }

  private updateCategories() {
    if (!this.checkbook.id) return;

    this.categoryUnsubscribe?.();
    this.categoryUnsubscribe = this.categoryService.getCategories(this.checkbook.id, snapshot => {
        this.categories = snapshot.docs.map(doc => {
          const category = doc.data() as Category;
          category.id = doc.id;
          return category
        });
      },
    );
  }

}
