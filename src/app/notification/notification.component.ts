import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string;
  route: string;

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.message = "Your file upload is complete";
    this.route = "/" + "candidates/new";
  }

  closeNotification() {
    // this.notificationService.statusChangeEvent.next(false);
  }

  getDetails() {
    // this.notificationService.statusChangeEvent.next(false);
    // this.router.navigate(['/', 'candidates', 'new']);
  }

}
