import { Component, OnInit } from '@angular/core';

import { FilterService  } from './formulars/filter.service';
import { Iir2ndOrderConjCmplxService } from './formulars/iir-2nd-order-conj-cmplx.service';
import { PolyService  } from './formulars/poly.service';
import { ShelvingCutService  } from './formulars/shelving-cut.service';
import { DataService  } from './data/data.service';

declare var numeric: any;
declare var Plotly: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public numOperation = numeric;
  NFFT: number;
  fs: number;
  s_ls: Array<number>;
  S: any;
  S_mag: Array<number>;
  f_vec: Array<number>;
  EQ: any;

  // Shelving HF cut variables
  fc: number;
  G: number;
  eq: Array<number>;
  eq_CAP: number;
  EQ_mag: number;

  // Second Order Controller variables
  fp = 200;
  fz = 400;
  cp = 0.99486;
  cz = 0.91985;
  g = 1;

  // global impulse
  imp: any;
  W1: any;
  W1_mag: any;
  W1_S: any;
  H1: any;
  H1_Mag: any;

  // slider variables

  max_eq_fcut = 20000;
  min_eq_fcut = 20;
  value_eq_fcut = 7000;

  max_w1_g = 10;
  min_w1_g = 1;
  value_w1_g = 1;

  // polar plot
  magnitudeOfH1: any;
  phaseOfH1: any;

  // draggble
  draggable = true;

  constructor(private _DataService: DataService, private _Iir2ndOrderConjCmplxService: Iir2ndOrderConjCmplxService,
    private _ShelvingCutService: ShelvingCutService ) {
      this.numOperation = numeric;
  }

  ngOnInit() {
    this.NFFT = 8192;
    this.fs = 48 * Math.pow(10, 3);
    this._DataService.getJSON().subscribe(data => {
     this.s_ls = data;
       this.performOperation();
    });
  }

  performOperation() {
    const temp  = this.s_ls.slice(0, this.NFFT);
   this.S = new numeric.T(temp).fft();
   // temp = this.S.slice(0, (this.NFFT/2 + 1)  );
   const S_mag_Abs = this.S.abs().x.slice(0, (this.NFFT / 2 + 1) );
   const S_mag_Ln = numeric.log(S_mag_Abs);
   const S_mag_Log = numeric.div(S_mag_Ln, 2.303);
   this.S_mag = numeric.mul(S_mag_Log, 20);

    // calculate f_vec
   const temp1 = numeric.linspace(0, 1, (this.NFFT / 2 + 1));
    this.f_vec = numeric.mul(temp1, (this.fs / 2));
    // Shelving HF cut calculations
    this.fc = 7000;
    this.G = -20;
    //  ********************************************
    this.update_Eq_Mag();

    // Second Order Controller
    this.fp = 200;
    this.cp = 0.99486;
    this.fz = 400;
    this.cz = 0.91985;
    this.g = 1;

    this.update_W1_Mag();
    this.update_h1_tf();
    this.update_Polar_Plot();
  }

  fcut_update (event: any) {
    if (event.value !== undefined) {
      this.fc = event.value;
      this.update_Eq_Mag();
      this.update_h1_tf();
      this.update_Polar_Plot();
    } else {
      this.fc = event.target.value;
      this.update_Eq_Mag();
      this.update_h1_tf();
      this.update_Polar_Plot();
    }
  }

  w1_g_update(event: any) {
    if (event.value !== undefined) {
      this.g = event.value;
      this.update_W1_Mag();
      this.update_h1_tf();
      this.update_Polar_Plot();
  } else {
      this.g = event.target.value;
      this.update_W1_Mag();
      this.update_h1_tf();
      this.update_Polar_Plot();
    }
  }

  update_h1_tf() {
    this.W1_S =  this.W1.mul(this.EQ.mul(this.S));
    const W1_S_Plus_One =  this.W1_S.add(1);
    const Real_Square_W1_S_Plus_One = numeric.mul(W1_S_Plus_One.x, W1_S_Plus_One.x);
    const Img_Square_W1_S_Plus_One = numeric.mul(W1_S_Plus_One.y, W1_S_Plus_One.y);
    const sum = numeric.add(Real_Square_W1_S_Plus_One, Img_Square_W1_S_Plus_One);
    const firsthalf_of_eqn = numeric.div(W1_S_Plus_One.x, sum);
    const secondthalf_of_eqn = numeric.mul(numeric.div(W1_S_Plus_One.y, sum), -1);
    this.H1 = new numeric.T(firsthalf_of_eqn, secondthalf_of_eqn);

     const H1_mag_Abs = this.H1.abs().x.slice(0, (this.NFFT / 2 + 1) );
     const H1_mag_Ln = numeric.log(H1_mag_Abs);
     const H1_mag_Log = numeric.div(H1_mag_Ln, 2.303);
     this.H1_Mag = numeric.mul(H1_mag_Log, 20);
  }

  update_Eq_Mag() {
    this.eq = this._ShelvingCutService.shelving_cut(this.fs, this.fc, this.G, this.NFFT);
    const temp2 = this.eq.slice(0, this.NFFT);
     this.EQ = new numeric.T(temp2).fft();
     const EQ_mag_Abs = this.EQ.abs().x.slice(0, (this.NFFT / 2 + 1) );
     const EQ_mag_Ln = numeric.log(EQ_mag_Abs);
     const EQ_mag_Log = numeric.div(EQ_mag_Ln, 2.303);
     this.EQ_mag = numeric.mul(EQ_mag_Log, 20);
  }

  update_W1_Mag() {
    this.imp = this._Iir2ndOrderConjCmplxService.iir_2nd_order_conj_cmplx(this.fp, this.cp, this.fz, this.cz, this.g, this.fs, this.NFFT);
    const temp3 = this.imp.slice(0, this.NFFT);
    this.W1 = new numeric.T(temp3).fft();
    const W1_mag_Abs = this.W1.abs().x.slice(0, (this.NFFT / 2 + 1) );
    const W1_mag_Ln = numeric.log(W1_mag_Abs);
    const W1_mag_Log = numeric.div(W1_mag_Ln, 2.303);
    this.W1_mag = numeric.mul(W1_mag_Log, 20);
  }

  update_Polar_Plot() {
    this.update_h1_tf();
    /* const real_div_real = numeric.div(this.H1.x.slice(0, (this.NFFT / 2 + 1)), this.H1.x.slice(0, (this.NFFT / 2 + 1)));
    const img_div_Real = numeric.div(this.H1.y.slice(0, (this.NFFT / 2 + 1)), this.H1.x.slice(0, (this.NFFT / 2 + 1)));

     // calculate Magnitude of H1
    const temp1 = numeric.pow(real_div_real, 2);
    const temp2 = numeric.pow(img_div_Real, 2 );
    const temp3 = numeric.add(temp1, temp2);
    this.magnitudeOfH1 = numeric.sqrt(temp3);
    // calulate phase of H1
    this.phaseOfH1 = numeric.mul(numeric.atan(img_div_Real), (180 / Math.PI));*/

    this.magnitudeOfH1 = this.H1.abs().x.slice(0, (this.NFFT / 2 + 1) );
    const phaseOfH1_Rad = numeric.atan2(this.H1.x.slice(0, (this.NFFT / 2 + 1) ), this.H1.y.slice(0, (this.NFFT / 2 + 1) ) );
    this.phaseOfH1 = numeric.mul(phaseOfH1_Rad, (180 / Math.PI) );
  }

  toggleDrag() {
    if (this.draggable === true) {
      this.draggable = false;
    } else {
      this.draggable = true;
    }

  }
}
