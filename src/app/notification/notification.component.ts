import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;
  @Input() index: number;
  message: string;
  redirect: boolean;
  path: string;

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.message = this.notification.message;
    this.redirect = this.notification.redirect;
    if (this.redirect) {
      this.path = "/" + this.notification.path;
    }
  }

  closeNotification() {
    this.notificationService.removeNotification(this.index);
  }

  getDetails() {
    this.notificationService.removeNotification(this.index);
    this.router.navigateByUrl(this.path);
  }

}
