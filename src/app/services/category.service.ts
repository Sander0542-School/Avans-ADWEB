import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference, deleteDoc, doc,
  Firestore,
  onSnapshot, query,
  QueryConstraint,
  QuerySnapshot, updateDoc
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

  getCategories(checkbookId: string, callback: (snapshot: QuerySnapshot<Category>) => void, ...queryConstrains: QueryConstraint[]) {
    const subCollection = collection(this.firestore, `checkbooks`, checkbookId, 'categories') as CollectionReference<Category>;

    return onSnapshot(query(subCollection, ...queryConstrains), callback);
  }

  async addCategory(checkbook: Checkbook, category: Category) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories'), category);
  }

  async updateCategory(checkbook: Checkbook, category: Category, data: Partial<Category>) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories'), category.id), data);
  }

  async deleteCategory(checkbook: Checkbook, category: Category) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories'), category.id));
  }
}
