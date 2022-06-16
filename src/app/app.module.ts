import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import '@angular/common/locales/global/nl';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {providePerformance, getPerformance} from '@angular/fire/performance';
import {provideRemoteConfig, getRemoteConfig} from '@angular/fire/remote-config';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {NavigationComponent} from './layouts/navigation/navigation.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {HomeComponent} from './pages/home/home.component';
import {CheckbookListComponent} from './pages/checkbook/checkbook-list/checkbook-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CheckbookComponent} from './pages/checkbook/checkbook/checkbook.component';
import {CheckbookCreateComponent} from './pages/checkbook/checkbook-create/checkbook-create.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CheckbookArchivedComponent} from './pages/checkbook/checkbook-archived/checkbook-archived.component';
import {CheckbookEditComponent} from './pages/checkbook/checkbook-edit/checkbook-edit.component';
import {CheckbookTableComponent} from './components/checkbook/checkbook-table/checkbook-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CheckbookListComponent,
    CheckbookComponent,
    CheckbookArchivedComponent,
    CheckbookCreateComponent,
    CheckbookEditComponent,
    CheckbookTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    {provide: LOCALE_ID, useValue: 'nl-NL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
