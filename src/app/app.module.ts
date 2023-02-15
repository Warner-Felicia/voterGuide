import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { CandidateComponent } from './admin/candidates/candidate.component';
import { ResponsesComponent } from './admin/responses/responses.component';
import { CandidateListComponent } from './admin/candidates/candidate-list/candidate-list.component';
import { CandidateUploadComponent } from './admin/candidates/candidate-upload/candidate-upload.component';
import { CandidateItemComponent } from './admin/candidates/candidate-list/candidate-item/candidate-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetStartedComponent,
    AdminComponent,
    CandidateComponent,
    ResponsesComponent,
    CandidateListComponent,
    CandidateUploadComponent,
    CandidateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
