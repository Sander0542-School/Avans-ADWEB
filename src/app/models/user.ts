import {DocumentData} from "@angular/fire/firestore";

export interface User extends DocumentData {
  uid: string;
  email: string;
  name: string;
}
