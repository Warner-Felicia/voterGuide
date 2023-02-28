import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { County } from './county.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountyService {
  favoriteCounties: County[] = [];
  otherCounties: County[] = []; 
  favoriteCountiesChangeEvent = new Subject<County[]>();
  otherCountiesChangeEvent = new Subject<County[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, counties: County[] }>(
      'http://localhost:3000/counties'
    ).subscribe(
      (responseData: { message: String, counties: County[] }) => {
        this.sortCounties(responseData.counties);
        this.favoriteCountiesChangeEvent.next([...this.favoriteCounties]);
        this.otherCountiesChangeEvent.next([...this.otherCounties]);
      }
    );
  }

  getFavoriteCounties() {
    return [...this.favoriteCounties];
  }

  getOtherCounties() {
    return [...this.otherCounties];
  }

  toggleFavorite(countyName: string, favorite: boolean) {
    if (!countyName) {
      return;
    }
    let position: number;
    
    if (favorite) {
      position = this.favoriteCounties.findIndex(c => c.countyName === countyName);
    } else if (!favorite) {
      position = this.otherCounties.findIndex(c => c.countyName === countyName);
    } else {
      return;
    }

    this.http.put<{ message: String, updatedCounty: County }>(
      'http://localhost:3000/counties/toggleFavorite',
      { countyName: countyName }
    ).subscribe(
      (responseData: { message: String, updatedCounty: County }) => {
        if (favorite) {
          this.favoriteCounties.splice(position, 1);
          this.otherCounties.push(responseData.updatedCounty);
          this.otherCounties = this.otherCounties.sort((a, b) => a.countyName > b.countyName ? 1 : -1);
        } else {
          this.otherCounties.splice(position, 1);
          this.favoriteCounties.push(responseData.updatedCounty);
          this.favoriteCounties = this.favoriteCounties.sort((a, b) => a.countyName > b.countyName ? 1 : -1);
        }
        this.favoriteCountiesChangeEvent.next([...this.favoriteCounties]);
        this.otherCountiesChangeEvent.next([...this.otherCounties]);
      }
    )
  }

  sortCounties(counties: County[]) {
    for (let county of counties) {
      if (county.favorite === true) {
        this.favoriteCounties.push(county);
      } else {
        this.otherCounties.push(county);
      }
    }
  }
}
