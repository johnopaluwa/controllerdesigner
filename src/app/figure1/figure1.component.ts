import { Component, OnChanges, Input  } from '@angular/core';

declare var numeric: any;
declare var Plotly: any;


@Component({
  selector: 'app-figure1',
  templateUrl: './figure1.component.html',
  styleUrls: ['./figure1.component.css']
})

export class Figure1Component implements OnChanges  {
  @Input() f_vec: any;
  @Input() S_mag: any;
  @Input() EQ_mag: any;
  constructor() {}

  ngOnChanges() {
    const WIDTH_IN_PERCENT_OF_PARENT = 45;
    const HEIGHT_IN_PERCENT_OF_PARENT = 45;
    const d3 = Plotly.d3;
    const gd3 = d3.select('#myDiv')
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
    const S_z = {
      x: this.f_vec,
      y: this.S_mag,
      name: 'S(z)',
      type: 'scatter'
    };
    const EQ_z = {
      x: this.f_vec,
      y: this.EQ_mag,
      name: 'EQ(z)',
      type: 'scatter'
    };
    const S_zEQ_z = {
      x: this.f_vec,
      y: numeric.add(this.S_mag, this.EQ_mag),
      name: 'S(z)EQ(z)',
      type: 'scatter'
    };
    const data = [S_z, EQ_z, S_zEQ_z];

    const layout = {
      title: 'Plot of f_vec against S_mag, EQ_mag, and (S_mag + EQ_mag) ',
      titlefont: {
        family: 'Courier New, monospace',
        size: 13,
        color: '#7f7f7f'
      },
      xaxis: {
        title: 'f_vec',
        titlefont: {
          family: 'Courier New, monospace',
          size: 13,
          color: '#7f7f7f'
        },
        type: 'log',
        range: [ Math.log(20) / 2.303, Math.log(20000) / 2.303  ]
      },
      yaxis: {
        title: 'S_mag,  EQ_mag,  (S_mag + EQ_mag) ',
        titlefont: {
          family: 'Courier New, monospace',
          size: 9,
          color: '#7f7f7f'
    },
        range: [-60, 0]
      }
    };
    Plotly.react(gd, data, layout);
    window.addEventListener('resize', function() { Plotly.Plots.resize(gd); });
  }

}
