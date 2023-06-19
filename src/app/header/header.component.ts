import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../admin/candidates/candidate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
  }

}
