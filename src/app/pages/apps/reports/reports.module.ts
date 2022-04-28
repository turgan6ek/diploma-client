import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportComponent } from './report/report.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {PageLayoutModule} from "../../../../@vex/components/page-layout/page-layout.module";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ReportComponent
  ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        PageLayoutModule,
        FlexModule
    ]
})
export class ReportsModule { }
