import * as d3 from "d3";
import {inject, noView, bindable} from 'aurelia-framework';
import * as _ from "lodash"

import { connectTo, dispatchify  } from 'aurelia-store';
import { State } from 'store/state';

import { select } from 'store/actions/data';

@inject(Element)
@noView()
@connectTo()
export class ScatterPlotCustomElement{
  public state: State;

  // D3 variables
  private svg;
  private x;
  private y;

  // set the dimensions and margins of the graph
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = 600 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;

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

    // set the ranges
    this.x = d3.scaleLinear()
      .range([0, this.width]);

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    // add the x Axis
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .attr("class", "xAxis");

    // add the y Axis
    this.svg.append("g")
      .attr("class", "yAxis");
  }

  updateChart(state) {
    let self = this;

    // Update domains
    this.x.domain(d3.extent(state.data, function(d) { return +d[0] }));
    this.y.domain(d3.extent(state.data, function(d) { return +d[1] }));

    // Select chart
    let chart = this.svg.selectAll(".points")
      .data(state.data)

    // Update axis
    this.svg.selectAll(".xAxis")
      .call(d3.axisBottom(this.x));
    this.svg.selectAll(".yAxis")
      .call(d3.axisLeft(this.y));

    // Add and update points
    chart.enter()
      .append("circle")
      .attr("class", "point")
      .on("click", function(d) {
        dispatchify(select)(d)
      })
      .merge(chart)
        .transition(1000)
        .attr('cx', function(d){ return self.x(d[0]); })
        .attr('cy', function(d){ return self.y(d[1]); })
        .attr('r', 5 )
        .style('fill',  function(d){ return d[2]; });

    // Remove points
    chart.exit().remove();
  }
}
