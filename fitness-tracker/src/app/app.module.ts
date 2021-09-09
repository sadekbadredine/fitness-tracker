import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { CurrentTrainingComponent } from './components/training/current-training/current-training.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { PastTrainingComponent } from './components/training/past-training/past-training.component';
import { NewTrainingComponent } from './components/training/new-training/new-training.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { TrainingComponent } from './pages/training/training.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppComponent } from './app.component';

import { AuthService } from './pages/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
