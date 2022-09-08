import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShepherdsViewComponent } from './shepherds-view.component';

const routes: Routes = [
    {
        path: '',
        component: ShepherdsViewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShepherdsViewRoutingModule { }
