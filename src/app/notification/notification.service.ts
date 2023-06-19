import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit{
  notifications: [{ message: string, path: string }];
  notificationChangeEvent = new Subject<[{ message: string, path: string }]>();

  constructor() { }

  ngOnInit(): void {
    
  }

}
