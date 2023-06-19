import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map, first } from 'rxjs/operators';

import { Candidate } from './candidate.model';
import { UnmatchedResponse } from './candidate-merge/unmatchedResponse.model';
import { NotificationService } from 'src/app/notification/notification.service';

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
  notifications: [{ message: string, path: string}];

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
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
    this.http.post<{ message: String, candidates: Candidate[], newCandidates: Candidate[], uncategorizedRaces: String[] }>(
      'http://localhost:3000/candidates',
      formData,
    ).subscribe(responseData => {
      this.candidates = responseData.candidates;
      this.newCandidates = responseData.newCandidates;
      this.candidatesChangeEvent.next([...this.candidates]);
      this.newCandidatesChangeEvent.next([...this.newCandidates]);
      this.notifications.push({
        message: "Your file upload has completed",
        path: "/candidates/new"
})
      this.notificationService.notificationChangeEvent.next(this.notifications);
      // if (responseData.uncategorizedRaces.length > 0) {
      //   this.notificationService.statusChangeEvent.next(true);
      // }
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
    this.http.put<{ message: string, candidate: Candidate }>(
      'http://localhost:3000/candidates/reviewCandidates',
      candidate
    ).subscribe(responseData => {
      console.log(responseData.candidate);
      this.reviewCandidates.splice(position, 1);
      this.reviewCandidatesChangeEvent.next([...this.reviewCandidates]);
    });
  }

  getUnmatchedResponses(): UnmatchedResponse[]{
    this.http.get<{ message: string, unmatchedResponses: UnmatchedResponse[] }>(
      'http://localhost:3000/candidates/unmatchedResponses'
    ).subscribe(responseData => {
      this.unmatchedResponses = responseData.unmatchedResponses;
      this.unmatchedResponseChangeEvent.next([...this.unmatchedResponses]);
    }) 
    return this.unmatchedResponses; 
  }

  updateCandidate(candidate: Candidate) {
    this.http.put<{ message: string }>('http://localhost:3000/candidates/mergeCandidates',
    candidate).subscribe(responseData => {
      console.log(responseData);
    })
  }

  getCandidatesByCounty(county: string) {
    return this.http.get<{ candidates: Candidate[]}>('http://localhost:3000/candidates/byCounty' + county).pipe(map(responseData => {
      return responseData.candidates
    }))
  }

  deleteCandidateById(id: string) {
    console.log(id);
    if(!id) {
      return;
    }

    const position = this.candidates.findIndex(r => r._id === id);

    if(position < 0) {
      return;
    }

    this.http.delete<{ message: string }>(
      'http://localhost:3000/candidates/delete' + id
    ).subscribe(responseData => {
      console.log(responseData);
      this.candidates.splice(position, 1);
      this.candidatesChangeEvent.next([...this.candidates]);
    })
  }

}
