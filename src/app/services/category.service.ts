import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc, deleteDoc, QuerySnapshot, QueryConstraint, CollectionReference, onSnapshot, query,
} from "@angular/fire/firestore";
import {Transaction} from "../models/transaction";
import {Category} from "../models/category";

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
}
