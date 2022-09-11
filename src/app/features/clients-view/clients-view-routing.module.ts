import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsViewComponent } from './clients-view.component';

const routes: Routes = [
    {
        path: '',
        component: ClientsViewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsViewRoutingModule { }
