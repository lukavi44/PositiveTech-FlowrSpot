import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { UserPageComponent } from './components/user-page/user-page.component';
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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
