import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {
  expense: Expense = {
    id: '',
    date: new Date(),
    amount: 0,
    description: '',
    photoPath: '',
    notes: ''
  };

  constructor(
    private expenseService: ExpenseService,
    private toastController: ToastController,
    private platform: Platform
  ) {}

  async takePicture() {
    try {
      if (!this.platform.is('hybrid')) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          this.showToast('Tu navegador no soporta el acceso a la cámara');
          return;
        }
        
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (e) {
          this.showToast('Se requiere permiso para usar la cámara');
          return;
        }
      }

      const photoPath = await this.expenseService.takePhoto();
      this.expense.photoPath = photoPath;
      this.showToast('Foto capturada correctamente');
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error?.message?.includes('cancelled') || 
          error?.message?.includes('denied')) {
        return; 
      }
      
      if (error?.message?.includes('permission')) {
        this.showToast('Se requiere permiso para usar la cámara');
        return;
      }
      
      this.showToast('Error al tomar la foto. Por favor, intenta de nuevo.');
    }
  }

  async saveExpense() {
    try {
      await this.expenseService.addExpense({ ...this.expense });
      this.showToast('Gasto guardado correctamente');
      this.resetForm();
    } catch (error) {
      this.showToast('Error al guardar el gasto');
    }
  }

  private resetForm() {
    this.expense = {
      id: '',
      date: new Date(),
      amount: 0,
      description: '',
      photoPath: '',
      notes: ''
    };
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
