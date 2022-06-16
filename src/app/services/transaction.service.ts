import {Injectable} from '@angular/core';
import {Checkbook} from "../models/checkbook";
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc, deleteDoc,
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

  async addTransaction(checkbook: Checkbook, transaction: Transaction) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transaction);
  }

  async updateTransaction(checkbookId: string, data: Partial<Transaction>, transactionId: string) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbookId, 'transactions'), transactionId), data);
  }

  async deleteTransaction(checkbookId: string, transactionId: string) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbookId, 'transactions'), transactionId));
  }
}
