import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CandidateService } from '../candidate.service';
import { CountyService } from '../../county/county.service';
import { County } from '../../county/county.model';

@Component({
  selector: 'app-candidate-upload',
  templateUrl: './candidate-upload.component.html',
  styleUrls: ['./candidate-upload.component.css']
})
export class CandidateUploadComponent implements OnInit, OnDestroy {
  favoriteCounties: County[] = [];
  counties: County[] = [];
  favoriteCountiesSubscription: Subscription;
  countiesSubscription: Subscription;
  uploadForm: FormGroup;
  showOtherCounties = false;
  isLoading = false;

  constructor(private candidateService: CandidateService, private countyService: CountyService, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    //setting up county information
    this.favoriteCounties = this.countyService.getFavoriteCounties();
    this.counties = this.countyService.getCounties();
    this.favoriteCountiesSubscription = this.countyService.favoriteCountiesChangeEvent.subscribe((counties: County[]) => {
      this.favoriteCounties = counties;
      
    });
    this.countiesSubscription = this.countyService.countiesChangeEvent.subscribe(
      (counties: County[]) => {
        this.counties = counties;
      }
    )

    this.uploadForm = this.formBuilder.group({
      candidateCSV: this.formBuilder.control('', Validators.required),
      counties: this.formBuilder.array([], Validators.required),
      trackPrimary: this.formBuilder.control(false)

    })
  }

  onSubmit() {
    this.isLoading = true;
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

  onShowOtherCounties(state: boolean) {
    this.showOtherCounties = state;
  }

  ngOnDestroy(): void {
    this.favoriteCountiesSubscription.unsubscribe();
    this.countiesSubscription.unsubscribe();
  }

}
