import * as d3 from 'd3';
import axisHandler from './axisHandler.js';
import store from './store.js';

function initialChartSetup() {
  var svg = d3.select("#charts"),
      margin = {top: 20, right: 20, bottom: 30, left: 0},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      medicationsSection = svg.append("g").attr("id", "gantt").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      radiationSection = svg.append("g").attr("id", "radiations").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      imagingSection = svg.append("g").attr("id", "imaging").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      linegraph = svg.append("g").attr("id", "line").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    store.setWidth(width)
    store.setHeight(height)
    store.setBaseElement(svg)
    store.setMargin(margin)
}

function buildAxes(){
  axisHandler.createXAxis()
  axisHandler.createYAxis()
}

function generateChart(data) {
  store.setCurrentData(data)
  initialChartSetup()
  buildAxes()
};

export default {
  generateChart: generateChart
}
