import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { CandidateComponent } from './admin/candidates/candidate.component';
import { CandidateListComponent } from './admin/candidates/candidate-list/candidate-list.component';
import { CandidateUploadComponent } from './admin/candidates/candidate-upload/candidate-upload.component';
import { CandidateItemComponent } from './admin/candidates/candidate-list/candidate-item/candidate-item.component';
import { FileUploadComponent } from './admin/candidates/file-upload/file-upload.component';
import { CandidatesFilterPipe } from './admin/candidates/candidate-filter.pipe';
import { CandidateReviewComponent } from './admin/candidates/candidate-review/candidate-review.component';
import { CandidateDetailComponent } from './admin/candidates/candidate-detail/candidate-detail.component';
import { CandidateMergeComponent } from './admin/candidates/candidate-merge/candidate-merge.component';
import { CandidatePrintComponent } from './admin/candidates/candidate-print/candidate-print.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetStartedComponent,
    AdminComponent,
    CandidateComponent,
    CandidateListComponent,
    CandidateUploadComponent,
    CandidateItemComponent,
    FileUploadComponent,
    CandidatesFilterPipe,
    CandidateReviewComponent,
    CandidateDetailComponent,
    CandidateMergeComponent,
    CandidatePrintComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
