import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Candidate } from './candidate.model';
import { CandidateService } from "./candidate.service";

@Injectable({ providedIn: 'root' })
export class CandidatesResolverService implements Resolve<Candidate[]> {
  constructor(private candidateService: CandidateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.candidateService.getCandidates();
  }
}