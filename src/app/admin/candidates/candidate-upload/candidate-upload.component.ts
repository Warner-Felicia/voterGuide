import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CandidateService } from '../candidate.service';
import { CountyService } from '../../../county/county.service';
import { County } from '../../../county/county.model';
import { requiredFileType } from 'src/app/shared/requiredFileType.service';

@Component({
  selector: 'app-candidate-upload',
  templateUrl: './candidate-upload.component.html',
  styleUrls: ['./candidate-upload.component.css']
})
export class CandidateUploadComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  favoriteCounties: County[] = [];
  otherCounties: County[] = [];
  favoriteCountiesSubscription: Subscription;
  otherCountiesSubscription: Subscription;
  uploadForm: FormGroup;

  constructor(private candidateService: CandidateService, private countyService: CountyService, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    //setting up county information
    this.favoriteCounties = this.countyService.getFavoriteCounties();
    this.otherCounties = this.countyService.getOtherCounties();
    this.favoriteCountiesSubscription = this.countyService.favoriteCountiesChangeEvent.subscribe((counties: County[]) => {
      this.favoriteCounties = counties;
      
    });
    this.otherCountiesSubscription = this.countyService.otherCountiesChangeEvent.subscribe(
      (counties: County[]) => {
        this.otherCounties = counties;
      }
    )

    this.uploadForm = this.formBuilder.group({
      candidateCSV: this.formBuilder.control('', [Validators.required]),
      counties: this.formBuilder.array([], [Validators.required]),
      trackPrimary: this.formBuilder.control(false)

    })
  }

  onSubmit() {
    const formValue = this.uploadForm.value;
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    this.candidateService.uploadCandidateData(formData);
  }

  onCheckboxChange(event) {
    const counties: FormArray = this.uploadForm.get('counties') as FormArray;
    if (event.target.checked) {
      counties.push(new FormControl(event.target.value));
    } else {
      const index = counties.controls.findIndex(x => x.value === event.target.value);
      counties.removeAt(index);
    }
  }

  toggleFavorite(countyName: string, favorite: boolean) {
    this.countyService.toggleFavorite(countyName, favorite);
  }

  ngOnDestroy(): void {
    this.favoriteCountiesSubscription.unsubscribe();
    this.otherCountiesSubscription.unsubscribe();
  }

}
