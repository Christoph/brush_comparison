import * as d3 from "d3";
import {inject, noView} from 'aurelia-framework';
import * as _ from "lodash"

import { connectTo } from 'aurelia-store';
import { State } from 'store/state';
import { DataStore } from 'data-store';


@inject(Element, DataStore)
@noView()
@connectTo()
export class MapCustomElement{
  public state: State;
  public geojson;

  // D3 variables
  private svg;
  private path;

  // set the dimensions and margins of the graph
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = 900 - this.margin.left - this.margin.right;
  height = 900 - this.margin.top - this.margin.bottom;

  constructor(public element: Element, public store: DataStore) {
    this.geojson = store.getGeoJson()

    this.initChart();
  }

  stateChanged(newState: State) {
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
      .fitExtent([[0, 0], [this.width, this.height]], this.geojson)

    this.path = d3.geoPath()
      .projection(projection);
  }

  updateChart(state) {
    let data = this.store.getElectionData("nrw2017");
    let values = Object.values(data)

    let extent = d3.extent(values, function(d) {
      return +d[state.selectedProperty]
    })

    let color = d3.scaleLinear<string>()
              // .domain(extent)
              .domain([0, 1])
              .range(['#D7DFE7', '#0E1F2E'])
              .interpolate(d3.interpolateHcl);

    console.log(color(0))
    console.log(color(1))

    this.svg.selectAll('path')
      .data(this.geojson["features"])
    .enter().append('path')
      .attr('d', this.path)
      .merge(this.svg.selectAll('path'))
      .style("fill", function(d) {
        if(data[d.properties.iso]) {
          return color(parseFloat(data[d.properties.iso][state.selectedProperty])/parseFloat(data[d.properties.iso]["abgegeben"]))
        }
        else {
          return "white"
        }
      })
      .attr('vector-effect', 'non-scaling-stroke')
      .style("stroke", "white")
      .on("mouseover", function(d) {
        // console.log(parseFloat(data[d.properties.iso][state.selectedProperty]))
        // console.log(parseFloat(data[d.properties.iso]["abgegeben"]))
        // console.log()
      })
  }
}
