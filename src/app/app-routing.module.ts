import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IdentificationComponent} from './pages/identification/identification.component';
import {LivenessComponent} from './pages/liveness/liveness.component';

const routes: Routes = [
    {path: 'identificator', component: IdentificationComponent},
    {path: 'liveness', component: LivenessComponent},
    {path: '**', pathMatch: 'full', redirectTo: '/liveness'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
