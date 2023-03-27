import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Candidate } from '../candidate.model';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
@Input() candidate: Candidate;
@Input() number: Number;
@Input() total: Number;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm) {
    const value = Object.entries(form.value);
    let response = [];
    value.forEach(([key, value]) => {
      const item = { tag: key, answer: value.toString() };
      response.push(item);
    });
    this.candidate.response = response;
    this.candidateService.updateResponse(response, this.candidate);
  }

}
