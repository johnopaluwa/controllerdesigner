import { Injectable } from '@angular/core';

declare var numeric: any;
declare var Plotly: any;

@Injectable()
export class PolyService {

  constructor() { }


   // check poly function again. Calculation error- minor error that seems to afect the result
  // helper function for polynomial(J.O)
  poly(rootArray) {
    const pz = Array.apply(null, Array(rootArray.length + 1 ) ).map(Number.prototype.valueOf, 0);
    pz[0] = 1;
    const zz = rootArray;
    let temp = Array.apply(null, Array(rootArray.length + 1 ) ).map(Number.prototype.valueOf, 0);
    temp[0] = 1;
    let front: any = 0;
    for (let i = 0 ; i < zz.length; i++) {
      for (let j = 1; j <= i + 1; j++) {
          if (typeof temp[j] !== 'number') {
            front = temp[j];
          } else {
          front = new numeric.T(temp[j], 0);
          }
          const back = zz[i].mul(temp[j - 1]);
          if (back.x === undefined) {
          back.x = 0;
          }
          if (back.y === undefined) {
          back.y = 0;
          }
          const Real = front.x - back.x;
          const img = front.y - back.y;
             pz[j] = new numeric.T(Real, img);
      }
      temp = pz.slice();
    }
      return pz;
  }


}
