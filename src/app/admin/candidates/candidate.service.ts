import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';

import { Candidate } from './candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidates: Candidate[] = [];
  newCandidates: Candidate[] = [];
  candidatesChangeEvent = new Subject<Candidate[]>(); 
  newCandidatesChangeEvent = new Subject<Candidate[]>();

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<{ message: String, candidates: Candidate[] }>(
      'http://localhost:3000/candidates'
    ).subscribe(
      (responseData: { message: String, candidates: Candidate[] }) => {
        this.candidates = responseData.candidates;
        this.candidatesChangeEvent.next([...this.candidates]);
        this.newCandidatesChangeEvent.next([...this.newCandidates]);
    }
    )
  }

  getCandidates(): Candidate[] {
    return [...this.candidates];
  }

  getNewCandidates(): Candidate[] {
    return [...this.newCandidates];
  }

  uploadCandidateData(formData: FormData) {
    if(!formData) {
      return;
    }
    this.http.post<{ message: String, candidates: Candidate[], newCandidates: Candidate[] }>(
      'http://localhost:3000/candidates',
      formData,
    ).subscribe(responseData => {
      this.candidates = responseData.candidates;
      this.newCandidates = responseData.newCandidates;
      this.candidatesChangeEvent.next([...this.candidates]);
      this.newCandidatesChangeEvent.next([...this.newCandidates]);
      this.router.navigate(['/', 'candidates', 'new']);
    })
  }

  getCandidatesToReview() {
    console.log('here');
  }

}
