import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [ListComponent]
})
export class ListModule { }
