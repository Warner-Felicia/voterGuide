import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { County } from '../admin/county/county.model';
import { CountyService } from '../admin/county/county.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit, OnDestroy {
  counties: County[];
  countyChangeEvent: Subscription;

  constructor(private countyService: CountyService) { }

  ngOnInit(): void {
    this.counties = this.countyService.getCounties();
    this.countyChangeEvent = this.countyService.countiesChangeEvent.subscribe(counties => {
      this.counties = counties;
    })
  }

  ngOnDestroy(): void {
    this.countyChangeEvent.unsubscribe();
  }

}
