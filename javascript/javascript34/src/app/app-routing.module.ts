import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoComponent } from './go/go.component';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'go', component: GoComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
