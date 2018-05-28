import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { Figure1Component } from './figure1/figure1.component';
import { Figure2Component } from './figure2/figure2.component';
import { Figure3Component } from './figure3/figure3.component';

import { DataService } from './data/data.service';
import { FilterService  } from './formulars/filter.service';
import { Iir2ndOrderConjCmplxService } from './formulars/iir-2nd-order-conj-cmplx.service';
import { PolyService  } from './formulars/poly.service';
import { ShelvingCutService  } from './formulars/shelving-cut.service';
import { Figure4Component } from './figure4/figure4.component';



@NgModule({
  declarations: [
    AppComponent,
    Figure1Component,
    Figure2Component,
    Figure3Component,
    Figure4Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularDraggableModule
  ],
  providers: [DataService,
    FilterService,
    Iir2ndOrderConjCmplxService,
    PolyService,
    ShelvingCutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
