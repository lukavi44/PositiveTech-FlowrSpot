import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/dialog/login/login.component';
import { NewAccountComponent } from './components/dialog/new-account/new-account.component';
import { SettingsComponent } from './components/dialog/settings/settings.component';
import { SightingListComponent } from './components/sightings/sighting-list/sighting-list.component';
import { UserPageComponent } from './components/sightings/user-page/user-page.component';
import { FlowerDetailComponent } from './flower/flower-detail/flower-detail.component';
import { FlowerListComponent } from './flower/flower-list/flower-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'flowers', component: FlowerListComponent },
  { path: 'flowers/:id', component: FlowerDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-account', component: NewAccountComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'user-page/:id', component: UserPageComponent },
  { path: 'sighting-list', component: SightingListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
