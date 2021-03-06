import { Component, OnChanges, Input  } from '@angular/core';

declare var numeric: any;
declare var Plotly: any;

@Component({
  selector: 'app-figure2',
  templateUrl: './figure2.component.html',
  styleUrls: ['./figure2.component.css']
})
export class Figure2Component implements OnChanges {
  @Input() f_vec: any;
  @Input() W1_mag: any;

  constructor() { }

  ngOnChanges() {
    const WIDTH_IN_PERCENT_OF_PARENT = 45;
    const HEIGHT_IN_PERCENT_OF_PARENT = 45;
    const d3 = Plotly.d3;
    const gd3 = d3.select('#myDiv1')
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
     // second plot
  const W1_z = {
    x: this.f_vec,
    y: this.W1_mag,
    name: 'W1(z)',
    type: 'scatter'
  };

  const data = [W1_z];

  const layout = {
    title: 'Plot of f_vec against W1_mag ',
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
      title: 'W1_mag',
       titlefont: {
        family: 'Courier New, monospace',
        size: 13,
        color: '#7f7f7f'
      },
      range: [-20, 60]
    }
  };
  Plotly.react(gd, data, layout);
  window.addEventListener('resize', function() { Plotly.Plots.resize(gd); });
  }


}
