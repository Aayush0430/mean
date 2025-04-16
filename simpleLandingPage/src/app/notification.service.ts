import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Registering the service globally
})
export class NotificationService {
  private messageSource = new BehaviorSubject<string>('');
  private durationSource = new BehaviorSubject<number>(3000);

  message$ = this.messageSource.asObservable();
  duration$ = this.durationSource.asObservable();

  showMessage(message: string, duration: number = 3000) {
    this.messageSource.next(message);
    this.durationSource.next(duration);
  }

  clearMessage() {
    this.messageSource.next('');
  }
}
