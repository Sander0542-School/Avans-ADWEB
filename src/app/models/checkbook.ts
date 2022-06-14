import {DocumentData} from "@angular/fire/firestore";

export interface Checkbook extends DocumentData {
  id: string
  name: string;
  description: string;
  users: string[]
}
