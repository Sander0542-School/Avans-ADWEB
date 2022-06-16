import {DocumentData, Timestamp} from "@angular/fire/firestore";

export interface Transaction extends DocumentData {
  id: string;
  datetime: Timestamp;
  value: number;
}
