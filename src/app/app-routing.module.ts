import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IdentificationComponent} from './pages/identification/identification.component';
import {LivenessComponent} from './pages/liveness/liveness.component';
import {PassiveLivenessComponent} from './pages/passive_liveness/passive_liveness.component';

const routes: Routes = [
    {path: 'identificator', component: IdentificationComponent},
    {path: 'liveness', component: LivenessComponent},
    {path: 'passive_liveness', component: PassiveLivenessComponent},
    {path: '**', pathMatch: 'full', redirectTo: '/identificator'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
