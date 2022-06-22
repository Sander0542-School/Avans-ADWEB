import {DocumentData, Timestamp} from "@angular/fire/firestore";

export interface Transaction extends DocumentData {
  id: string;
  value: number;
  datetime: Timestamp;
  checkbookId?: string
  categoryId?: string;
}
