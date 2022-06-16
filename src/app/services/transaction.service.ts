import {Injectable} from '@angular/core';
import {Checkbook} from "../models/checkbook";
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc, deleteDoc, QuerySnapshot, QueryConstraint, CollectionReference, onSnapshot, query,
} from "@angular/fire/firestore";
import {Transaction} from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private firestore: Firestore
  ) {
  }

  getTransactions(checkbook: Checkbook, callback: (snapshot: QuerySnapshot<Transaction>) => void, ...queryConstrains: QueryConstraint[]) {
    const subCollection = collection(this.firestore, `checkbooks`, checkbook.id, 'transactions') as CollectionReference<Transaction>;

    return onSnapshot(query(subCollection, ...queryConstrains), callback);
  }

  async addTransaction(checkbook: Checkbook, transaction: Transaction) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transaction);
  }

  async updateTransaction(checkbook: Checkbook, transaction: Transaction, data: Partial<Transaction>) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transaction.id), data);
  }

  async deleteTransaction(checkbook: Checkbook, transaction: Transaction) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transaction.id));
  }
}
