import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { County } from './county.model';
import { CountyService } from './county.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCountiesResolverService implements Resolve<County[]> {
  constructor(private countyService: CountyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const counties = this.countyService.getFavoriteCounties();
    return counties;
  }
}