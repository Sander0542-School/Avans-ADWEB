import {DocumentData, Timestamp} from "@angular/fire/firestore";

export interface Category extends DocumentData {
  id: string;
  name: string;
  budget: number;
  endDate?: Timestamp;
}
