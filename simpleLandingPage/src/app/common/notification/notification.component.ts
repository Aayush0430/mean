import { NgIf } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [NgIf],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() message: string = ''; // Message to display in notification
  @Input() duration: number = 3000; // Duration for the notification to disappear (in milliseconds)

  showNotification: boolean = false;
  private timerSubscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.message) {
      this.showNotification = true;
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private startTimer() {
    this.timerSubscription = timer(this.duration).subscribe(() => {
      this.showNotification = false;
    });
  }
}
