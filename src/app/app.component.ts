import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'voterGuide';
  notifications: [{ message: string, path: string}];
  statusSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
    
  }

  ngOnInit(): void {
    this.statusSubscription = this.notificationService.notificationChangeEvent.subscribe(notifications => {
      this.notifications = notifications;
    })
  }
}
