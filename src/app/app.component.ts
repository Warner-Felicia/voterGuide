import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './notification/notification.service';
import { Subscription } from 'rxjs';

import { Notification } from './notification/notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'voterGuide';
  notifications: Notification[] = [];
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
    
  }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notificationChangeEvent.subscribe(notifications => {
      this.notifications = notifications;
    })
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
