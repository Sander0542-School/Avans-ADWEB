import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../../../services/category.service";
import {Category} from "../../../../../models/category";
import {deleteField, Timestamp} from "@angular/fire/firestore";
import {Checkbook} from "../../../../../models/checkbook";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      budget: ['', Validators.required],
      endDate: [''],
    });
    if (this.data.category) {
      this.form.patchValue({
        name: this.data.category.name,
        budget: this.data.category.budget,
        endDate: this.data.category.endDate?.toDate(),
      });
    }
  }

  async save() {
    if (!this.form.valid) return;

    const category = {
      name: this.form.value.name,
      budget: this.form.value.budget,
    } as Category;

    if (this.form.value.endDate) {
      category.endDate = Timestamp.fromDate(this.form.value.endDate);
    }

    console.log()

    if (this.data.category) {
      await this.categoryService.updateCategory(this.data.checkbook, this.data.category, {
        endDate: deleteField(),
        ...category,
      });
    } else {
      await this.categoryService.addCategory(this.data.checkbook, category);
    }

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

type Data = {
  checkbook: Checkbook,
  category?: Category
}
