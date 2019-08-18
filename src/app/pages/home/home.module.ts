import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListModule } from 'src/app/components/list/list.module';
import { MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDividerModule,
    ListModule
  ]
})
export class HomeModule { }
