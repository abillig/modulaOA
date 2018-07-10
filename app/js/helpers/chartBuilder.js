import * as d3 from 'd3';
import axisHandler from './axisHandler.js';
import dataDrawer from './dataDrawer.js';
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

function generateChart(data) {
  function consolidateData(data){
    var dataKeys = Object.keys(data)
    var consolidatedData = []
    dataKeys.forEach(function(key){
      consolidatedData = consolidatedData.concat(data[key])
    })
    return consolidatedData
  }
  store.setCurrentData(consolidateData(data))
  initialChartSetup()
  buildAxes()
  // var medicationsSection = store.get().baseElement.append("g").attr("id", "gantt").attr("transform", "translate(" + store.get().margin.left + "," + store.get().margin.top + ")")
  // var radiationSection = store.get().baseElement.append("g").attr("id", "radiations").attr("transform", "translate(" + store.get().margin.left + "," + store.get().margin.top + ")")
  // var imagingSection = store.get().baseElement.append("g").attr("id", "imaging").attr("transform", "translate(" + store.get().margin.left + "," + store.get().margin.top + ")")
  dataDrawer.drawCircles(store.get().baseElement, store.get().currentData, 'medication-circle')
  // dataDrawer.drawCircles(store.get().baseElement, store.get().currentData, 'radiation-circle')
  // dataDrawer.drawCircles(store.get().baseElement, store.get().currentData, 'imaging-circle')
  // dataDrawer.drawCircles(store.get().baseElement, store.get().currentData.basic_plotting_categories, 'medication-circle')
};

export default {
  generateChart: generateChart
}
