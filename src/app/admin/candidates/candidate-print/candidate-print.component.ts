import { Component, OnDestroy, OnInit } from '@angular/core';

import { County } from "../../county/county.model";
import { Candidate } from "../candidate.model";
import { CountyService } from '../../county/county.service';
import { CandidateService } from '../candidate.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-print',
  templateUrl: './candidate-print.component.html',
  styleUrls: ['./candidate-print.component.css']
})
export class CandidatePrintComponent implements OnInit, OnDestroy {
  counties: County[] = [];
  countyName: string;
  candidates$: Observable<Candidate[]>;
  candidates: Candidate[];
  contests: string[] = [];
  printGuideForm: FormGroup;
  candidateSubscription: Subscription;
  countySubscription: Subscription;
  draggingIndex: number;

  constructor(private countyService: CountyService, private candidateService: CandidateService, private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.counties = this.countyService.getCounties();
    this.countySubscription = this.countyService.countiesChangeEvent.subscribe((counties: County[]) => {
      this.counties = counties;
    })

    this.printGuideForm = this.formBuider.group({
      county: this.formBuider.control('', Validators.required)
    });
  }

  onSelectCounty(county: string) {
    this.countyName = county;
    this.contests = [];
    if (this.countyName) {
      this.candidates$ = this.candidateService.getCandidatesByCounty(county);
      this.candidates$.subscribe((candidates: Candidate[]) => {
        this.candidates = candidates;
        this.candidates.forEach(candidate => {
          if (!this.contests.includes(candidate.contestName)) {
            this.contests.push(candidate.contestName);
          }
        });
      })
    }
  }

  onDragStart(fromIndex: number) {
    this.draggingIndex = fromIndex;
  }

  onDragEnter(toIndex: number) {
    if (this.draggingIndex !== toIndex) {
      this.reorderItem(this.draggingIndex, toIndex);
    }
  }

  onDragEnd() {
    this.draggingIndex = undefined;
  }

  createWordDoc() {
    console.log('Dude');
  }

  ngOnDestroy(): void {
    this.countySubscription.unsubscribe();
  }

  private reorderItem(fromIndex: number, toIndex: number) {
    const itemToBeReordered = this.contests.splice(fromIndex, 1)[0];
    this.contests.splice(toIndex, 0, itemToBeReordered);
    this.draggingIndex = toIndex;
  }

}
