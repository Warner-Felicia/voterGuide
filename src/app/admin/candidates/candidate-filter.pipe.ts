import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

import { Candidate } from './candidate.model';

@Pipe({
  name: 'candidatesFilter'
})

export class CandidatesFilterPipe implements PipeTransform {

  transform(candidates: Candidate[], term: string): any {
    let filteredCandidates: Candidate[] = [];

    if (term && term.length > 0) {
      filteredCandidates = candidates.filter(
        (candidate: Candidate) => (candidate.nameOnBallot.toLowerCase().includes(term.toLowerCase()) || candidate.contestName.toLowerCase().includes(term.toLowerCase()))
      );
    }

    if (term) {
      return filteredCandidates;
    } else {
      return candidates;
    }
  }
}