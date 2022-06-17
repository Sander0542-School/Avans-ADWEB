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

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private firestore: Firestore
  ) {
  }

  getCategories(checkbook: Checkbook, ...queryConstrains: QueryConstraint[]) {
    const queryCollection = collection(this.firestore, `checkbooks`, checkbook.id, 'categories') as CollectionReference<Category>;

    return collectionData(query(queryCollection, ...queryConstrains), {
      idField: 'id'
    });
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
