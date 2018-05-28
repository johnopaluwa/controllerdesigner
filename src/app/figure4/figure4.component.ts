import { Component, OnChanges, Input } from '@angular/core';

declare var numeric: any;
declare var Plotly: any;

@Component({
  selector: 'app-figure4',
  templateUrl: './figure4.component.html',
  styleUrls: ['./figure4.component.css']
})
export class Figure4Component implements OnChanges {
  @Input() magnitudeOfH1: any;
  @Input() phaseOfH1: any;


  constructor() { }

  ngOnChanges() {
    // console.log(this.phaseOfH1)
    const WIDTH_IN_PERCENT_OF_PARENT = 45;
    const HEIGHT_IN_PERCENT_OF_PARENT = 45;
    const d3 = Plotly.d3;
    const gd3 = d3.select('#myDiv3')
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
    const polarPlot = {
      r: this.magnitudeOfH1,
      theta: this.phaseOfH1,
      mode: 'lines',
      name: 'Polar Plot',
      line: {color: 'peru'},
      type: 'scatterpolar'
   };

   const data = [polarPlot];

   const layout = {
    title: 'Plot plot ',
    titlefont: {
      family: 'Courier New, monospace',
      size: 13,
      color: '#7f7f7f'
    },
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 2]
      }
    }
   };

   Plotly.react(gd, data, layout);
   window.addEventListener('resize', function() { Plotly.Plots.resize(gd); });
    }


}
