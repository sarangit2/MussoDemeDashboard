import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'primeng/chart';

import { HeaderComponent } from './header/header.component';

import { CommonModule } from '@angular/common';
import { FormationsComponent } from './formations/formations.component';


import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { OffreEmploiComponent } from './offre-emploi/offre-emploi.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,

    HeaderComponent,
    FormationsComponent,
    ArticleComponent,
    UserComponent,
    SettingsComponent,
    LoginComponent,
    OffreEmploiComponent,
  
   
 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    ChartModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
