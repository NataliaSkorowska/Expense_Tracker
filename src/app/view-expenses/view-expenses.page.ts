import { Component, OnInit } from '@angular/core';
import {Receipt} from '../../shared/Receipt';
import {ReceiptService} from '../../shared/receipt.service'

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.page.html',
  styleUrls: ['./view-expenses.page.scss'],
})
export class ViewExpensesPage implements OnInit {
  Receipts = [];

  constructor(
    private aptService: ReceiptService
  ) { }

  ngOnInit() {
    this.fetchReceipts();
    let receiptRes = this.aptService.getReceiptList();
    receiptRes.snapshotChanges().subscribe(res => {
      this.Receipts = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Receipts.push(a as Receipt);
      })
    })
  }

  fetchReceipts() {
    this.aptService.getReceiptList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteReceipt(key){
    this.aptService.deleteReceipt(key);
  }
}
