import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingsRoutingModule } from './standings-routing.module';
import { StandingsComponent } from './standings.component';
import { ListModule } from 'src/app/components/list/list.module';

@NgModule({
  declarations: [StandingsComponent],
  imports: [
    CommonModule,
    StandingsRoutingModule,
    ListModule
  ]
})
export class StandingsModule { }
