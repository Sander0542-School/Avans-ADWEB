import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {HomeComponent} from "./pages/home/home.component";
import {CheckbookListComponent} from "./pages/checkbook/checkbook-list/checkbook-list.component";

const requireLogin = canActivate(() => redirectUnauthorizedTo(['']));

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'checkbooks', component: CheckbookListComponent, ...requireLogin},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
