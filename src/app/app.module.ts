import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularMaterialModule} from './app-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IdentificationComponent} from './pages/identification/identification.component';
import {DniPictureGetterComponent} from './components/dni-picture-getter/dni-picture-getter.component';

@NgModule({
    declarations: [
        AppComponent,
        IdentificationComponent,
        DniPictureGetterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
