import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({template: `
  <ng-template [ngTemplateOutlet]="template">
  </ng-template>
`})
export class ModalDialogComponent {

  template: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.template = data.template;
  }

}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  private _dialogRef: MatDialogRef<ModalDialogComponent>;

  constructor(private _dialog: MatDialog) { }

  ngOnInit() { }

  open() {
    this._dialogRef = this._dialog.open(ModalDialogComponent, {
      // width: '800px',
      // minHeight: '600px',
      data: { template: this.template }
    });
  }

  onClose(): Observable<any> {
    return this._dialogRef.afterClosed();
  }

}
