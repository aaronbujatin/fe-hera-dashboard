import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccess(message: string) {
    // logic to show the toast
    const toastElement = document.getElementById('toast-success');
    if (toastElement) {
      toastElement.style.display = 'flex';
    }
  }
}
