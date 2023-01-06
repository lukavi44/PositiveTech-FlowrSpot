import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/dialog/login/login.component';
import { NewAccountComponent } from './components/dialog/new-account/new-account.component';
import { SettingsComponent } from './components/dialog/settings/settings.component';
import { NewSightingComponent } from './components/sightings/new-sighting/new-sighting.component';
import { SightingDetailComponent } from './components/sightings/sighting-detail/sighting-detail.component';
import { SightingListComponent } from './components/sightings/sighting-list/sighting-list.component';
import { MyPageComponent } from './components/sightings/user-page/my-page/my-page.component';
import { UserPageComponent } from './components/sightings/user-page/user-page.component';
import { FavoritesComponent } from './flower/favorites/favorites.component';
import { FlowerDetailComponent } from './flower/flower-detail/flower-detail.component';
import { FlowerListComponent } from './flower/flower-list/flower-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'flowers', component: FlowerListComponent },
  { path: 'flowers/favorites', component: FavoritesComponent },
  { path: 'flowers/:id', component: FlowerDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-account', component: NewAccountComponent },
  { path: 'user-page', component: MyPageComponent },
  { path: 'user-page/:id', component: UserPageComponent },
  { path: 'sighting-list', component: SightingListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'sighting/:id', component: SightingDetailComponent },
  { path: 'new-sighting', component: NewSightingComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
