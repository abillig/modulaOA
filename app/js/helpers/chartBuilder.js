import * as d3 from 'd3';
import axisHandler from './axisHandler.js';
import dataDrawer from './dataDrawer.js';
import zoomHandler from './zoomHandler.js';
import store from './store.js';

function initialChartSetup() {
  var svg = d3.select("#charts"),
      margin = {top: 20, right: 20, bottom: 30, left: 0},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom

  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    store.setWidth(width)
    store.setHeight(height)
    store.setBaseElement(svg)
    store.setMargin(margin)
    store.setTooltip(tooltip)
}

function buildAxes(){
  axisHandler.createXAxis()
  axisHandler.createYAxis()
}

function consolidateData(data){
  var dataKeys = Object.keys(data)
  var consolidatedData = []
  dataKeys.forEach(function(key){
    consolidatedData = consolidatedData.concat(data[key])
  })
  return consolidatedData
}

function generateChart(data) {
  store.setAllData(consolidateData(data))
  store.setCurrentData(consolidateData(data))
  initialChartSetup()
  buildAxes()

  dataDrawer.drawCircles(store.get().baseElement, store.get().currentData)
  zoomHandler.calculateZoomLevelMapping()
  zoomHandler.configureSlider()
};

export default {
  generateChart: generateChart
}
