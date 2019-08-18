import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent, ModalDialogComponent } from './modal.component';
import { MatDialogModule, MatDialog } from '@angular/material';

@NgModule({
  declarations: [ModalComponent, ModalDialogComponent],
  entryComponents: [ModalDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ModalComponent],
  providers: [MatDialog]
})
export class ModalModule { }
