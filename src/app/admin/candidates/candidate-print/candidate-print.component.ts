import { Component, OnInit } from '@angular/core';

import { County } from "../../county/county.model";
import { Candidate } from "../candidate.model";
import { CountyService } from '../../county/county.service';
import { CandidateService } from '../candidate.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-print',
  templateUrl: './candidate-print.component.html',
  styleUrls: ['./candidate-print.component.css']
})
export class CandidatePrintComponent implements OnInit {
  counties: County[] = [];
  candidates$: Observable<Candidate[]>;
  candidates: Candidate[];
  contests: string[] = [];
  printGuideForm: FormGroup;

  constructor(private countyService: CountyService, private candidateService: CandidateService, private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.counties = this.countyService.getCounties();
    this.countyService.countiesChangeEvent.subscribe((counties: County[]) => {
      this.counties = counties;
    })

    this.printGuideForm = this.formBuider.group({
      county: this.formBuider.control('', Validators.required)
    });
  }

  onSelectCounty(county: string) {
    this.candidates$ = this.candidateService.getCandidatesByCounty(county);
    this.candidates$.subscribe((candidates: Candidate[]) => {
      this.candidates = candidates;
      this.candidates.forEach(candidate => {
        if (!this.contests.includes(candidate.contestName)) {
          this.contests.push(candidate.contestName);
        }
      });
      console.log(this.contests);
    })
  }

}
