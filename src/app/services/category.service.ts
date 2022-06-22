import {Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  QueryConstraint,
  CollectionReference,
  query,
  collectionData
} from "@angular/fire/firestore";
import {Category} from "../models/category";
import {Checkbook} from "../models/checkbook";
import {forkJoin, Observable, switchMap} from "rxjs";
import {Transaction} from "../models/transaction";
import {TransactionService} from "./transaction.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private firestore: Firestore,
    private transactionService: TransactionService
  ) {
  }

  getCategories(checkbook: Checkbook, ...queryConstrains: QueryConstraint[]) {
    const queryCollection = collection(this.firestore, `checkbooks`, checkbook.id, 'categories') as CollectionReference<Category>;

    return collectionData(query(queryCollection, ...queryConstrains), {
      idField: 'id'
    });
  }

  getCategoriesWithTransactions(checkbook: Checkbook, ...queryConstrains: QueryConstraint[]) {
    return this.getCategories(checkbook, ...queryConstrains).pipe(
      map(categories => categories.map(category => this.transactionService.getTransactionsByCategory(checkbook, category))),
      switchMap(transactions => forkJoin(transactions))
    )
  }

  async addCategory(checkbook: Checkbook, category: Category) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories'), category);
  }

  async updateCategory(checkbook: Checkbook, category: Category, data: object) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories'), category.id), data);
  }

  async deleteCategory(checkbook: Checkbook, category: Category) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories'), category.id));
  }
}
