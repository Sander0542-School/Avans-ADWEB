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
  collectionGroup,
  collectionData,
  where, collectionSnapshots
} from "@angular/fire/firestore";
import {Transaction} from "../models/transaction";
import {Category} from "../models/category";
import {BehaviorSubject, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private firestore: Firestore
  ) {
  }

  getTransactions(checkbook: Checkbook, ...queryConstrains: QueryConstraint[]) {
    const queryCollection = collectionGroup(this.firestore, 'transactions') as CollectionReference<Transaction>;

    return collectionData(query(queryCollection, where('checkbookId', '==', checkbook.id), ...queryConstrains), {
      idField: 'id'
    });
  }

  getTransactionsByCategory(checkbook: Checkbook, category: Category, ...queryConstrains: QueryConstraint[]) {
    const queryCollection = collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions') as CollectionReference<Transaction>;

    return collectionData(query(queryCollection, ...queryConstrains), {
      idField: 'id'
    });
  }

  getTransactionsWithCategory(checkbook: Checkbook, ...queryConstrains: QueryConstraint[]) {
    const queryCollection = collectionGroup(this.firestore, 'transactions') as CollectionReference<Transaction>;
    const snapshotQuery = query(queryCollection, where('checkbookId', '==', checkbook.id), ...queryConstrains);

    return collectionSnapshots(snapshotQuery).pipe(switchMap(documents => {
      return new BehaviorSubject(documents.map(document => ({
        ...document.data(),
        id: document.id,
        categoryId: document.ref.parent.parent?.id
      } as Transaction)))
    }))
  }

  async addTransaction(checkbook: Checkbook, category: Category, transaction: Transaction) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions'), {
      checkbookId: checkbook.id,
      ...transaction
    });
  }

  async updateTransaction(checkbook: Checkbook, category: Category, transaction: Transaction, data: Partial<Transaction>) {
    return await updateDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions'), transaction.id), data);
  }

  async deleteTransaction(checkbook: Checkbook, category: Category, transaction: Transaction) {
    return await deleteDoc(doc(collection(this.firestore, 'checkbooks', checkbook.id, 'categories', category.id, 'transactions'), transaction.id));
  }
}
