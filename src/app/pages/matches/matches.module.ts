import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { ListModule } from 'src/app/components/list/list.module';
import { MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, MatDividerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FormModule } from 'src/app/components/form/form.module';

@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    FormModule,
    ListModule
  ]
})
export class MatchesModule { }
