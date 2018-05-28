import { Injectable } from '@angular/core';
import { PolyService  } from './poly.service';
import { FilterService  } from './filter.service';

declare var numeric: any;
declare var Plotly: any;

@Injectable()
export class Iir2ndOrderConjCmplxService {

  constructor(private polyService: PolyService, private filterService: FilterService) { }

  iir_2nd_order_conj_cmplx(fp, cp, fz, cz, g, fs,  NFFT): any {
    let temp1: any = cz * Math.exp(((new numeric.T(0, 1)).mul(2 * Math.PI * fz / fs )).x);
    let temp2 = cz * (((new numeric.T(0, 1)).mul(2 * Math.PI * fz / fs )).y);
    const z = new numeric.T(temp1, temp2);

    temp1 = cp * Math.exp(((new numeric.T(0, 1)).mul(2 * Math.PI * fp / fs )).x);
    temp2 = cp * (((new numeric.T(0, 1)).mul(2 * Math.PI * fp / fs )).y);
    const p = new numeric.T(temp1, temp2);

    // const b = this.poly([z, z.conj()]);
    const b = [];
    temp1 = this.polyService.poly([z, z.conj()]);
    for (let i = 0; i < temp1.length; i++) {
      if ( typeof temp1[i] === 'number' ) {
       b[i] = temp1[i] * g;
      } else {
         b[i] = temp1[i].mul(g);
      }
    }
    const a = this.polyService.poly([p, p.conj()]);

   // make a array of numbers
   for (let i = 0; i < a.length; i++) {
    if ( typeof a[i] === 'number' ) {
     a[i] = a[i];
    } else {
       a[i] = a[i].x;
    }
  }
     // make b array of numbers
     for (let i = 0; i < b.length; i++) {
      if ( typeof b[i] === 'number' ) {
       b[i] = b[i];
      } else {
         b[i] = b[i].x;
      }
    }

    const arrayOfFrequencies = Array.apply(null, Array(NFFT)).map(Number.prototype.valueOf, 0);
    arrayOfFrequencies[0] = 1;

   const impulseRes = this.filterService.filter(b, a, arrayOfFrequencies);
   return impulseRes;
  }

}
