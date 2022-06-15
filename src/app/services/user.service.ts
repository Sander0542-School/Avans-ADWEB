import {Injectable} from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  setDoc,
  doc,
  QuerySnapshot,
  onSnapshot, query
} from "@angular/fire/firestore";
import {User} from "../models/user";
import {User as FirebaseUser} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly collection: CollectionReference<User>

  constructor(
    private firestore: Firestore
  ) {
    this.collection = collection(firestore, 'users') as CollectionReference<User>;
  }

  getUsers(callback: (snapshot: QuerySnapshot<User>) => void) {
    onSnapshot(query(this.collection), callback);
  }

  async updateUser(user: FirebaseUser | null) {
    if (user == null) return;

    const userModel = {
      email: user.email,
      name: user.displayName,
    }

    await setDoc(doc(this.collection, user.uid), userModel as User)
  }
}
