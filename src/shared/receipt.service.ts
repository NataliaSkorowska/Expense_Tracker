import { Injectable } from '@angular/core';
import { Receipt } from '../shared/Receipt';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  receiptListRef: AngularFireList<any>;
  receiptRef: AngularFireObject<any>;


  constructor(private db: AngularFireDatabase) { }

  // Create
  createReceipt(apt: Receipt, image: string) {
    this.receiptListRef = this.db.list('/Receipt');
    return this.receiptListRef.push({
      name: apt.name,
      date: apt.date,
      amount: apt.amount,
      image: image
    })
  }

   // Get List
   getReceiptList() {
    this.receiptListRef = this.db.list('/Receipt');
    return this.receiptListRef;
  }

  //Delete 
  deleteReceipt(receipt_id:string){
    this.receiptListRef = this.db.list('/Receipt');
    this.receiptListRef.remove(receipt_id);
  }
}
