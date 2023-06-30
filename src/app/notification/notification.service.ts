import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit{
  notifications: Notification[] = [];
  notificationChangeEvent = new Subject<Notification[]>();

  constructor() { }

  ngOnInit(): void {
    
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.notificationChangeEvent.next([...this.notifications])
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
    this.notificationChangeEvent.next([...this.notifications]);
  }

}
