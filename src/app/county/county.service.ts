import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { County } from './county.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountyService {
  favoriteCounties: County[] = [];
  counties: County[] = [];
  favoriteCountiesChangeEvent = new Subject<County[]>();
  countiesChangeEvent = new Subject<County[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, counties: County[] }>(
      'http://localhost:3000/counties'
    ).subscribe(
      (responseData: { message: String, counties: County[] }) => {
        this.sortCounties(responseData.counties);
        this.counties = responseData.counties;
        this.favoriteCountiesChangeEvent.next([...this.favoriteCounties]);
        this.countiesChangeEvent.next([...this.counties]);
      }
    );
  }

  getFavoriteCounties() {
    return [...this.favoriteCounties];
  }

  getCounties() {
    return [...this.counties];
  }

  toggleFavorite(countyName: string, favorite: boolean) {
    if (!countyName) {
      return;
    }
    let favPosition: number;
    let position: number;

    if (favorite) {
      favPosition = this.favoriteCounties.findIndex(c => c.countyName === countyName);
    }

    position = this.counties.findIndex(c => c.countyName === countyName);

    if (position < 0 || (favorite && favPosition < 0)) {
      return;
    }


    this.http.put<{ message: String, updatedCounty: County }>(
      'http://localhost:3000/counties/toggleFavorite',
      { countyName: countyName }
    ).subscribe(
      (responseData: { message: String, updatedCounty: County }) => {
        if (favorite) {
          this.favoriteCounties.splice(position, 1);
        } else {
          this.favoriteCounties.push(responseData.updatedCounty);
          this.favoriteCounties = this.favoriteCounties.sort((a, b) => a.countyName > b.countyName ? 1 : -1);
        }
        this.counties[position] = responseData.updatedCounty;
        this.counties = this.counties.sort((a, b) => a.countyName > b.countyName ? 1 : -1);
        this.favoriteCountiesChangeEvent.next([...this.favoriteCounties]);
        this.countiesChangeEvent.next([...this.counties]);
      }
    )
  }

  sortCounties(counties: County[]) {
    for (let county of counties) {
      if (county.favorite === true) {
        this.favoriteCounties.push(county);
      } 
    }
  }
}
