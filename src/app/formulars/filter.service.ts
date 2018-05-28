import { Injectable } from '@angular/core';

declare var numeric: any;
declare var Plotly: any;

@Injectable()
export class FilterService {

  constructor() { }

    // implement filter function(J.O)
    filter(b , a, x) {
      const filter = [];
      const a1: Array<any> = this.getRealArrayScalarDiv(a, a[0]);
      const b1: Array<any> = this.getRealArrayScalarDiv(b, a[0]);
      const sx = x.length;
      filter[0] = b1[0] * x[0];
      for (let  i = 1; i < sx; i++) {
        filter[i] = 0.0;
        for (let j = 0; j <= i; j++) {
          const k = i - j;
          if (j > 0) {
            if ((k < b1.length) && (j < x.length)) {
              filter[i] += b1[k] * x[j];
            }
            if ((k < filter.length) && (j < a1.length)) {
              filter[i] -= a1[j] * filter[k];
            }
          } else {
            if ((k < b1.length) && (j < x.length)) {
              filter[i] += (b1[k] * x[j]);
            }
          }
        }
      }
      return filter;
    }

    // helper function for filter(J.O)
    getRealArrayScalarDiv(dDividend, dDivisor) {
      if (dDividend == null) {
        console.log('The array must be defined or diferent to null');
      }
      if (dDividend.length === 0) {
        console.log('The size array must be greater than Zero');
      }
     const dQuotient = [];

      for (let i = 0; i < dDividend.length; i++) {
        if (!(dDivisor === 0.0)) {
          dQuotient[i] = dDividend[i] / dDivisor;
        } else {
          if (dDividend[i] > 0.0) {
            dQuotient[i] = Number.POSITIVE_INFINITY;
          }
          if (dDividend[i] === 0.0) {
            dQuotient[i] = NaN;
          }
          if (dDividend[i] < 0.0) {
            dQuotient[i] = Number.NEGATIVE_INFINITY;
          }
        }
      }
      return dQuotient;
    }

}
