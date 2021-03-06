import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {HomeComponent} from "./pages/home/home.component";
import {CheckbookListComponent} from "./pages/checkbook/checkbook-list/checkbook-list.component";
import {CheckbookComponent} from "./pages/checkbook/checkbook/checkbook.component";
import {CheckbookArchivedComponent} from "./pages/checkbook/checkbook-archived/checkbook-archived.component";

const requireLogin = canActivate(() => redirectUnauthorizedTo(['']));

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'checkbooks', component: CheckbookListComponent, ...requireLogin},
  {path: 'checkbooks/archived', component: CheckbookArchivedComponent, ...requireLogin},
  {path: 'checkbooks/:id', component: CheckbookComponent, ...requireLogin},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
