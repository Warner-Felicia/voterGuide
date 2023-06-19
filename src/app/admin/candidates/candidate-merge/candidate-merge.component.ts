import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, count, Subscription } from 'rxjs';

import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate.model';
import { UnmatchedResponse } from './unmatchedResponse.model';

@Component({
  selector: 'app-candidate-merge',
  templateUrl: './candidate-merge.component.html',
  styleUrls: ['./candidate-merge.component.css']
})
export class CandidateMergeComponent implements OnInit, OnDestroy {
  unmatchedResponses: UnmatchedResponse[];
  unmatchedResponseSubscription: Subscription;
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  candidateSubscription: Subscription;
  total: number;
  term: string;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.unmatchedResponses = this.candidateService.getUnmatchedResponses();
    this.unmatchedResponseSubscription = this.candidateService.unmatchedResponseChangeEvent.subscribe(responses => {
      this.unmatchedResponses = responses;
      this.total = this.unmatchedResponses.length;
    });
    this.candidates = this.candidateService.getCandidates();
    this.candidateSubscription = this.candidateService.candidatesChangeEvent.subscribe(candidates => {
      this.candidates = candidates;
    })
  }

  search(value: string) {
    this.term = value;
  }

  matchCandidate(unMatchedResponseId: string, unmatchedResponse: Array<{ question: string, answer: string, tag: string, order: number, textarea: boolean }>, actualNameOnBallot: String) {
    const candidate = this.candidates.find(candidate => candidate.nameOnBallot === actualNameOnBallot);
    candidate.response = unmatchedResponse;
    this.candidateService.updateCandidate(candidate);   
    
    this.candidateService.deleteCandidateById(unMatchedResponseId);
  }

  deleteResponse(id: string) {
    this.candidateService.deleteCandidateById(id);
  }

  ngOnDestroy(): void {
    this.candidateSubscription.unsubscribe();
    this.unmatchedResponseSubscription.unsubscribe();
  }

}
