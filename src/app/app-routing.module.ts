import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from 'src/app/admin/admin.component';
import { GetStartedComponent } from "src/app/get-started/get-started.component";
import { CandidateComponent } from './admin/candidates/candidate.component';
import { CandidatesResolverService } from './admin/candidates/candidates-resolver.service';
import { NewCandidatesResolverService } from './admin/candidates/new-candidates-resolver.service';
import { CandidateUploadComponent } from './admin/candidates/candidate-upload/candidate-upload.component';
import { CandidateListComponent } from './admin/candidates/candidate-list/candidate-list.component';
import { FavoriteCountiesResolverService } from './admin/county/favoriteCounties-resolver.service';
import { CountiesResolverService } from './admin/county/counties-resolver.service';
import { CandidateReviewComponent } from './admin/candidates/candidate-review/candidate-review.component';
import { CandidateMergeComponent } from './admin/candidates/candidate-merge/candidate-merge.component';

const appRoutes: Routes = [
  { path: '', component: GetStartedComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'candidates', component: CandidateComponent, resolve: [CandidatesResolverService, NewCandidatesResolverService], children: [
    { path: 'upload', component: CandidateUploadComponent, resolve: [FavoriteCountiesResolverService, CountiesResolverService] },
    { path: 'review', component: CandidateReviewComponent },
    { path: 'merge', component: CandidateMergeComponent},
    { path: ':mode', component: CandidateListComponent }
    
  ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
}) 

export class AppRoutingModule {

}