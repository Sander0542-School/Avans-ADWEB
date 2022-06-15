import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {
  Firestore,
  CollectionReference,
  QuerySnapshot,
  onSnapshot,
  query,
  collection,
  where,
  addDoc
} from "@angular/fire/firestore";
import {Checkbook} from "../models/checkbook";

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

  getCheckbooks(callback: (snapshot: QuerySnapshot<Checkbook>) => void) {
    onSnapshot(query(this.collection, where('users', 'array-contains', this.authService.currentUser?.uid)), callback);
  }

  async addCheckbook(checkbook: Checkbook) {
    return await addDoc(this.collection, checkbook);
  }
}

