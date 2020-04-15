import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {HttpClientModule} from '@angular/common/http';
import {StatComponent} from './stat/stat.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
    declarations: [
        AppComponent,
        StatComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        MatCardModule,
        MatBadgeModule,
        MatDividerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
