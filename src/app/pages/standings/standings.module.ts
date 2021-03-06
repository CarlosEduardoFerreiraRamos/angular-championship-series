import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingsRoutingModule } from './standings-routing.module';
import { StandingsComponent } from './standings.component';
import { ListModule } from 'src/app/components/list/list.module';
import { MatDividerModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [StandingsComponent],
  imports: [
    CommonModule,
    StandingsRoutingModule,
    MatDividerModule,
    MatTabsModule,
    ListModule
  ]
})
export class StandingsModule { }
