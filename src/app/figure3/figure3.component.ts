import { Component, OnChanges, Input  } from '@angular/core';

declare var numeric: any;
declare var Plotly: any;

@Component({
  selector: 'app-figure3',
  templateUrl: './figure3.component.html',
  styleUrls: ['./figure3.component.css']
})
export class Figure3Component implements OnChanges {
  @Input() f_vec: any;
  @Input() H1_mag: any;
  @Input() maxAmplification: any;

  constructor() {}

  ngOnChanges() {
    const WIDTH_IN_PERCENT_OF_PARENT = 45;
    const HEIGHT_IN_PERCENT_OF_PARENT = 40;
    const d3 = Plotly.d3;
    const gd3 = d3.select('#myDiv2')
    .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + 'vw',
        'margin-left': 0 + '%',
        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
        'margin-top': 0 + 'vh'
    });
    const gd = gd3.node();

    this.performPlot(gd);
  }

  performPlot(gd) {
 const H1_z = {
  x: this.f_vec,
  y: this.H1_mag,
  name: 'H1(z)',
  type: 'scatter'
};

const data = [H1_z];

const layout = {
  title: 'Plot of f_vec against H1_mag ',
  titlefont: {
    family: 'Courier New, monospace',
    size: 13,
    color: '#7f7f7f'
  },
  xaxis: {
    title: 'f_vec',
    type: 'log',
    range: [ Math.log(20) / 2.303, Math.log(20000) / 2.303  ]
  },
  yaxis: {
    title: 'H1_mag',
    range: [-60, 30]
  },
  margin: {
    t: 40,
    l: 40,
    r: 40,
    b: 40
  },
  shapes:  [{
        'type': 'line',
        'x0': 0,
        'y0': this.maxAmplification,
        'x1': 10000,
        'y1': this.maxAmplification,
        'line': {
            'color': 'rgb(50, 171, 96)',
            'width': 1,
            'dash': 'dashdot',
        },
    }]
};

Plotly.react(gd, data, layout);

window.addEventListener('resize', function() { Plotly.Plots.resize(gd); });

 }


}
