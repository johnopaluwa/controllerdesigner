import { Injectable } from '@angular/core';
import { FilterService  } from './filter.service';

declare var numeric: any;
declare var Plotly: any;

@Injectable()
export class ShelvingCutService {

  constructor(private filterService: FilterService) { }

  // perform shelving cut operation
  shelving_cut(fs: number, fc: number, G: number, NFFT): any {
    const k = Math.tan(Math.PI * fc / fs);
    const Vo = Math.pow(10, (G / 20));
    const b = Array.apply(null, Array(3)).map(Number.prototype.valueOf, 0);
    const a = Array.apply(null, Array(3)).map(Number.prototype.valueOf, 0);

    // calculate b[0]
    let temp1 = Vo * (1 + Math.sqrt(2) * k + Math.pow(k, 2));
    const temp2 = 1 + Math.sqrt(2 * Vo) * k + Vo * Math.pow(k, 2);
    b[0] = temp1 / temp2;

    // calculate b[1]
    temp1 = 2 * Vo * (Math.pow(k, 2) - 1);
    b[1] = temp1 / temp2;

    // calculate b[2]
    temp1 = Vo * (1 - Math.sqrt(2) * k + Math.pow(k, 2));
    b[2] = temp1 / temp2;

    a[0] = 1;
    a[1] = 2 * (Vo * Math.pow(k, 2) - 1 ) / temp2;
    a[2] = (1 - Math.sqrt(2 * Vo) * k + Vo * Math.pow(k, 2)) / temp2;
    // calculate the impulse response.

    const arrayOfFrequencies = Array.apply(null, Array(NFFT)).map(Number.prototype.valueOf, 0);
    arrayOfFrequencies[0] = 1;

    const impulseRes = this.filterService.filter(b, a, arrayOfFrequencies);
    return impulseRes;
  }

}
