import { Component, Input, OnInit } from '@angular/core';

import { Candidate } from '../../candidate.model';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.css']
})
export class CandidateItemComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit(): void {
  }

}
