import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlowerComponent } from './flower/flower.component';
import { FlowerItemComponent } from './flower/flower-item/flower-item.component';
import { NewAccountComponent } from './components/dialog/new-account/new-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/dialog/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LogoutComponent } from './components/dialog/logout/logout.component';
import { UserPageComponent } from './components/sightings/user-page/user-page.component';
import { SightingsComponent } from './components/sightings/sightings.component';
import { FlowerListComponent } from './flower/flower-list/flower-list.component';
import { FlowerDetailComponent } from './flower/flower-detail/flower-detail.component';
import { SightingListComponent } from './components/sightings/sighting-list/sighting-list.component';
import { SettingsComponent } from './components/dialog/settings/settings.component';
import { SightingDetailComponent } from './components/sightings/sighting-detail/sighting-detail.component';
import { NewSightingComponent } from './components/sightings/new-sighting/new-sighting.component';
import { FavoritesComponent } from './flower/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FlowerComponent,
    FlowerItemComponent,
    NewAccountComponent,
    LoginComponent,
    LogoutComponent,
    UserPageComponent,
    SightingsComponent,
    FlowerListComponent,
    FlowerDetailComponent,
    SightingListComponent,
    SettingsComponent,
    SightingDetailComponent,
    NewSightingComponent,
    FavoritesComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
