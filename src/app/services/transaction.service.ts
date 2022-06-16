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

  getTransactions(checkbookId: string, callback: (snapshot: QuerySnapshot<Transaction>) => void, ...queryConstrains: QueryConstraint[]) {
    const subCollection = collection(this.firestore, `checkbooks`, checkbookId, 'transactions') as CollectionReference<Transaction>;

    return onSnapshot(query(subCollection, ...queryConstrains), callback);
  }

  async addTransaction(checkbook: Checkbook, transaction: Transaction) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transaction);
  }

  async updateTransaction(checkbook: Checkbook, transactionId: string, data: Partial<Transaction>) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transactionId), data);
  }

  async deleteTransaction(checkbook: Checkbook, transactionId: string) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transactionId));
  }
}
