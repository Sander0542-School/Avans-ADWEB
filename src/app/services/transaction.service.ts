import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Checkbook} from "../models/checkbook";
import {
  Firestore,
  CollectionReference,
  QuerySnapshot,
  QueryConstraint,
  onSnapshot,
  query,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  docSnapshots,
} from "@angular/fire/firestore";
import {Transaction} from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {
  }

  async addTransaction(checkbook: Checkbook, transaction: Transaction) {
    return await addDoc(collection(this.firestore, 'checkbooks', checkbook.id, 'transactions'), transaction);
  }
}
