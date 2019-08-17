import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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
      this._columns = Object.keys(v);
    }
  }

  @ContentChild(TemplateRef) content: TemplateRef<any>;

  private _columns;

  private _data: any[];

  constructor() { }

  ngOnInit() {
  }
}

