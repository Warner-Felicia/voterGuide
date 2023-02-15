import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Candidate } from '../candidate.model';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {
  candidates: Candidate[] = [];
  candidateSubscription: Subscription;
  mode: String;
  isLoading = false;

  constructor(private candidateService: CandidateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      if (params.mode == 'new') {
        this.mode = 'new';
        this.candidates = this.candidateService.getNewCandidates();
        this.candidateSubscription = this.candidateService.newCandidatesChangeEvent.subscribe((candidates: Candidate[]) => {
          this.candidates = candidates;
        })
      } else {
        this.mode = 'all';
        this.candidates = this.candidateService.getCandidates();
        this.candidateSubscription = this.candidateService.candidatesChangeEvent.subscribe(
          (candidates: Candidate[]) => {
            this.candidates = candidates;
          }
        )
      }
      this.isLoading = false;
    })
  }
  
  ngOnDestroy(): void {
    this.candidateSubscription.unsubscribe();
  }

}
