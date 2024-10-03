import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormationsComponent } from './formations/formations.component';
import { ArticleComponent } from './article/article.component';

import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OffreEmploiComponent } from './offre-emploi/offre-emploi.component';




const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

   { path: 'utilisateur', component:  UserComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'article', component: ArticleComponent },
   { path: 'OffreEmploi', component: OffreEmploiComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
