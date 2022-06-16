import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
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
  docData, collectionData,
} from "@angular/fire/firestore";
import {Checkbook} from "../models/checkbook";
import {Transaction} from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class CheckbookService {
  private readonly collection: CollectionReference<Checkbook>

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {
    this.collection = collection(firestore, 'checkbooks') as CollectionReference<Checkbook>;
  }

  getCheckbooks(...queryConstrains: QueryConstraint[]) {
    return collectionData(query(this.collection, where('users', 'array-contains', this.authService.currentUser?.uid), ...queryConstrains), {
      idField: 'id'
    });
  }

  getCheckbook(checkbookId: string) {
    return docData(doc(this.collection, checkbookId), {
      idField: 'id',
    });
  }

  async updateCheckbook(checkbookId: string, data: Partial<Checkbook>) {
    return await updateDoc(doc(this.collection, checkbookId), data);
  }

  async addCheckbook(checkbook: Checkbook) {
    return await addDoc(this.collection, checkbook);
  }
}

