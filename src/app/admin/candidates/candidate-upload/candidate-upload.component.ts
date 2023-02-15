import { Component, OnInit } from '@angular/core';

import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-upload',
  templateUrl: './candidate-upload.component.html',
  styleUrls: ['./candidate-upload.component.css']
})
export class CandidateUploadComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    
  }

  onFileSelected(event) {
    this.isLoading = true;
    const file: File = event.target.files[0];
    if (file) {
      this.candidateService.uploadCandidateCSV(file);
    }
  }

  



}
