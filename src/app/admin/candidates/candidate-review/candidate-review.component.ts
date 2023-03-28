import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Candidate } from '../candidate.model';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-review',
  templateUrl: './candidate-review.component.html',
  styleUrls: ['./candidate-review.component.css']
})
export class CandidateReviewComponent implements OnInit, OnDestroy {
  reviewCandidates: Candidate[];
  candidateSubscription: Subscription;
  total: number;
  counter: number = 0;
  candidate: Candidate;
  editForm: FormGroup;

  constructor(private candidateService: CandidateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reviewCandidates = this.candidateService.getCandidatesToReview();
    this.candidateSubscription = this.candidateService.reviewCandidatesChangeEvent.subscribe(candidates => {
      this.total = candidates.length;
      this.reviewCandidates = candidates;
      this.candidate = this.reviewCandidates[this.counter];
      this.editForm = this.formBuilder.group({});
      if(this.candidate) {
        this.candidate.response.forEach(item => {
          this.editForm.addControl(item.tag, this.formBuilder.control(item.answer));
        })
      }
    })
  }

  onSubmit() {
    const value = Object.entries(this.editForm.value);
    let response = [];
    value.forEach(([key, value]) => {
      const item = { tag: key, answer: value };
      response.push(item);
    });
    this.candidateService.updateResponse(response, this.candidate);
  }

  ngOnDestroy(): void {
    this.candidateSubscription.unsubscribe();
  }
}


