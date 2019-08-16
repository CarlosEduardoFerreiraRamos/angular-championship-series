import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { ListModule } from 'src/app/components/list/list.module';

@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    ListModule
  ]
})
export class MatchesModule { }
