import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page implements OnInit {
  expenses: Expense[] = [];
  hasReceipts = false;

  constructor(
    private expenseService: ExpenseService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.loadReceipts();
  }

  ionViewWillEnter() {
    this.loadReceipts();
  }

  async loadReceipts() {
    this.expenses = await this.expenseService.getExpenses();
    this.hasReceipts = this.expenses.some(expense => expense.photoPath);
  }

  async showReceiptDetail(expense: Expense) {
    const modal = await this.modalController.create({
      component: 'receipt-detail',
      componentProps: {
        expense: expense
      }
    });
    return await modal.present();
  }
}
