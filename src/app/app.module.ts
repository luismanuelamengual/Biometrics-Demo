import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CameraComponent} from './components/camera/camera.component';
import {AngularMaterialModule} from './app-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PictureGetterComponent} from './components/picture-getter/picture-getter.component';
import {IdentificationComponent} from './pages/identification/identification.component';
import {BiometricsInterceptor} from './interceptors/biometrics.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        IdentificationComponent,
        CameraComponent,
        PictureGetterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BiometricsInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
