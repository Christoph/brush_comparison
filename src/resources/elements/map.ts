import * as d3 from "d3";
import {inject, noView} from 'aurelia-framework';
import * as _ from "lodash"

import { connectTo, dispatchify  } from 'aurelia-store';
import { State } from 'store/state';

// import * as zoning from '../../../data/sf_geo.json';
// import * as zoning from '../../../data/zoning.json';
// import * as zoning from '../../../data/laender_95_geo.json';
import * as zoning from '../../../data/gemeinden_95_geo.json';

@inject(Element)
@noView()
@connectTo()
export class MapCustomElement{
  public state: State;

  // D3 variables
  private svg;
  private path;

  // set the dimensions and margins of the graph
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = 900 - this.margin.left - this.margin.right;
  height = 900 - this.margin.top - this.margin.bottom;

  constructor(public element: Element) {
    this.initChart();
  }

  stateChanged(newState: State, oldState: State) {
    // this.svg.selectAll(".point").remove();
    this.updateChart(newState);
  }

  initChart() {
    // append the svg object to the chart div of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    this.svg = d3.select(this.element)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Projection
    var projection = d3.geoMercator()
      .fitExtent([[0, 0], [this.width, this.height]], zoning["default"])

    this.path = d3.geoPath()
      .projection(projection);
  }

  updateChart(state) {
    this.svg.selectAll('path')
      .data(zoning["features"])
    .enter().append('path')
      .attr('d', this.path)
      .attr('vector-effect', 'non-scaling-stroke')
      .style("stroke", "white")
  }
}
