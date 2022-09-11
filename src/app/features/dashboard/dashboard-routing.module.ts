import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { Route } from '../../enums/route.enum';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: Route.CLIENTS_VIEW,
        loadChildren: () => import('../clients-view/clients-view.module').then((m) => m.ClientsViewModule)
    },
    {
        path: Route.SHEPHERDS_VIEW,
        loadChildren: () => import('../shepherds-view/shepherds-view.module').then((m) => m.ShepherdsViewModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
