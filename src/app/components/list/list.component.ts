import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() displayedColumns: string[];

  @Input()
  get data(): any[] { return this._data; }
  set data(v: any[]) {
    if (v) {
      this._data = v;

      this.columns = this.data[0];
    }
  }

  get columns(): any { return this._columns; }
  set columns(v: any) {
    if (v) {
      if (this.displayedColumns) {
        this._columns = this.displayedColumns;
      } else {
        this._columns = Object.keys(v);
      }
    }
  }

  @Output() rowClick = new EventEmitter();

  @ContentChild(TemplateRef) content: TemplateRef<any>;

  private _columns;

  private _data: any[];

  onRowClick(row) {
    this.rowClick.emit(row);
  }

  get isInteractable(): boolean {
    return !!this.rowClick.observers.length;
  }

}

