import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Router } from '@angular/router';

import { Candidate } from './candidate.model';
import { UnmatchedResponse } from './candidate-merge/unmatchedResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidates: Candidate[] = [];
  newCandidates: Candidate[] = [];
  reviewCandidates: Candidate[] = [];
  unmatchedResponses: UnmatchedResponse[];
  candidatesChangeEvent = new Subject<Candidate[]>();
  newCandidatesChangeEvent = new Subject<Candidate[]>();
  reviewCandidatesChangeEvent = new Subject<Candidate[]>();
  unmatchedResponseChangeEvent = new Subject<UnmatchedResponse[]>();

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
    if (!formData) {
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

  getCandidatesToReview(): Candidate[] {
    this.http.get<{ message: String, candidates: Candidate[] }>(
      'http://localhost:3000/candidates/reviewCandidates'
    ).subscribe(responseData => {
      this.reviewCandidates = responseData.candidates;
      this.reviewCandidatesChangeEvent.next([...this.reviewCandidates]);
    })
    return [...this.reviewCandidates];
  }

  updateResponse(response: Array<{ tag: string, answer: string }>, candidate: Candidate) {
    if (!candidate) {
      return;
    }

    const position = this.reviewCandidates.findIndex(c => c._id === candidate._id);
    if (position < 0) {
      return;
    }

    //update answers
    for (let i = 0; i < response.length; i++) {
      candidate.response[i].answer = response[i].answer;
    }

    //approve response
    candidate.approved = true;

    //send put request to backend
    this.http.put<{ message: String, candidate: Candidate }>(
      'http://localhost:3000/candidates/reviewCandidates',
      candidate
    ).subscribe(responseData => {
      console.log(responseData.candidate);
      this.reviewCandidates.splice(position, 1);
      this.reviewCandidatesChangeEvent.next([...this.reviewCandidates]);
    });
  }

  getUnmatchedResponses(): UnmatchedResponse[]{
    this.http.get<{ message: String, unmatchedResponses: UnmatchedResponse[] }>(
      'http://localhost:3000/candidates/unmatchedResponses'
    ).subscribe(responseData => {
      this.unmatchedResponses = responseData.unmatchedResponses;
      this.unmatchedResponseChangeEvent.next([...this.unmatchedResponses]);
    }) 
    return this.unmatchedResponses; 
  }

  updateCandidate(candidate: Candidate) {
    this.http.put<{ message: String }>('http://localhost:3000/candidates/mergeCandidates',
    candidate).subscribe(responseData => {
      console.log(responseData);
    })
  }

  deleteCandidateById(id: String) {
    if(!id) {
      return;
    }

    const position = this.unmatchedResponses.findIndex(r => r._id === id);

    if(position < 0) {
      return;
    }

    this.http.delete<{ message: String }>(
      'http://localhost:3000/candidates/delete' + id
    ).subscribe(responseData => {
      this.unmatchedResponses.splice(position, 1);
      this.unmatchedResponseChangeEvent.next([...this.unmatchedResponses]);
    })
  }

}
