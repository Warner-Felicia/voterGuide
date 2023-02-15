import { Component, OnInit } from '@angular/core';
import { CandidateService } from './candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  uploadCandidates = true;
  allCandidates = false;
  newCandidates = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
  }

}
