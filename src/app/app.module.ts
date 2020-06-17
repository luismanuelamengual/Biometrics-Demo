import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularMaterialModule} from './app-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IdentificationComponent} from './pages/identification/identification.component';
import {DniPictureGetterComponent} from './components/dni-picture-getter/dni-picture-getter.component';
import {TitleCasePipe} from '@angular/common';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {LivenessComponent} from './pages/liveness/liveness.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        HttpClientModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    declarations: [
        AppComponent,
        IdentificationComponent,
        LivenessComponent,
        DniPictureGetterComponent
    ],
    providers: [
        TitleCasePipe
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
