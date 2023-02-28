import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from 'src/app/admin/admin.component';
import { GetStartedComponent } from "src/app/get-started/get-started.component";
import { CandidateComponent } from './admin/candidates/candidate.component';
import { ResponsesComponent } from './admin/responses/responses.component';
import { CandidatesResolverService } from './admin/candidates/candidates-resolver.service';
import { NewCandidatesResolverService } from './admin/candidates/new-candidates-resolver.service';
import { CandidateUploadComponent } from './admin/candidates/candidate-upload/candidate-upload.component';
import { CandidateListComponent } from './admin/candidates/candidate-list/candidate-list.component';
import { FavoriteCountiesResolverService } from './county/favoriteCounties-resolver.service';
import { OtherCountiesResolverService } from './county/otherCounties-resolver.service';

const appRoutes: Routes = [
  { path: '', component: GetStartedComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'responses', component: ResponsesComponent },
  { path: 'candidates', component: CandidateComponent, resolve: [CandidatesResolverService, NewCandidatesResolverService], children: [
    { path: 'upload', component: CandidateUploadComponent, resolve: [FavoriteCountiesResolverService, OtherCountiesResolverService] },
    { path: ':mode', component: CandidateListComponent },
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