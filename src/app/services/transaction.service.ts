import {Injectable} from '@angular/core';
import {Checkbook} from "../models/checkbook";
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  QuerySnapshot,
  QueryConstraint,
  CollectionReference,
  onSnapshot,
  query,
  collectionGroup, where
} from "@angular/fire/firestore";
import {Transaction} from "../models/transaction";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private firestore: Firestore
  ) {
  }

  getTransactions(checkbook: Checkbook, callback: (snapshot: QuerySnapshot<Transaction>) => void, ...queryConstrains: QueryConstraint[]) {
    const subCollection = collectionGroup(this.firestore, 'transactions') as CollectionReference<Transaction>;

    return onSnapshot(query(subCollection, where('checkbookId', '==', checkbook.id), ...queryConstrains), callback);
  }

  async addTransaction(checkbook: Checkbook, category: Category, transaction: Transaction) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions'), transaction);
  }

  async updateTransaction(checkbook: Checkbook, category: Category, transaction: Transaction, data: Partial<Transaction>) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions'), transaction.id), data);
  }

  async deleteTransaction(checkbook: Checkbook, category: Category, transaction: Transaction) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions'), transaction.id));
  }
}
