import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit {
  expenses: Expense[] = [];

  constructor(
    private expenseService: ExpenseService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    await this.loadExpenses();
  }

  ionViewWillEnter() {
    this.loadExpenses();
  }

  async loadExpenses() {
    this.expenses = await this.expenseService.getExpenses();
  }

  getTotal(): number {
    return this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }

  async deleteExpense(id: string) {
    try {
      await this.expenseService.deleteExpense(id);
      await this.loadExpenses();
      this.showToast('Gasto eliminado correctamente');
    } catch (error) {
      this.showToast('Error al eliminar el gasto');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
