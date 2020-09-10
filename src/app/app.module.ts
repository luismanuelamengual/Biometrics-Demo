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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BiometricsService} from './services/biometrics.service';
import {PassiveLivenessComponent} from './pages/passive_liveness/passive_liveness.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
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
        PassiveLivenessComponent,
        DniPictureGetterComponent
    ],
    providers: [
        BiometricsService,
        TitleCasePipe
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
