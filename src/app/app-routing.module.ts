import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IdentificationComponent} from './pages/identification/identification.component';
import {LivenessComponent} from './pages/liveness/liveness.component';
import {ConfigurationComponent} from './pages/configuration/configuration.component';
import {DocumentScannerComponent} from './pages/document-scanner/document-scanner.component';
import {Liveness3dComponent} from './pages/liveness3d/liveness3d.component';

const routes: Routes = [
    {path: 'identificator', component: IdentificationComponent},
    {path: 'liveness', component: LivenessComponent},
    {path: 'liveness3d', component: Liveness3dComponent},
    {path: 'document-scanner', component: DocumentScannerComponent},
    {path: 'configuration', component: ConfigurationComponent},
    {path: '**', pathMatch: 'full', redirectTo: '/identificator'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
