import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';
import {CometchatComponent} from './cometchat.component';


const routes: Routes = [
    {
        path: '',
        component: CometchatComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class CometchatRoutingModule {
}
