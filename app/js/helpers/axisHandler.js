import * as d3 from 'd3';
import datesHandler from './datesHandler.js';
import store from './store.js';


function buildXScale(){
  var x = d3.scaleTime()
          .rangeRound([150, store.get().width])

  return x
}

function addXDomain(xScale){
  xScale.domain(d3.extent(datesHandler.collectDates(store.get().currentData), function(d) { return datesHandler.parseTime(d); }));
  return xScale;
}

function buildXTimeScale(){
  var xScale = buildXScale();
  return addXDomain(xScale);
}


function createXAxis() {
  var baseElement = store.get().baseElement
  var height = store.get().height

  baseElement.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(buildXTimeScale()))
}

function makeYAxisLabels(){
  var medicationList = store.get().currentData.medications.map(medication => medication.name)
  var radiationList = store.get().currentData.radiation.map(radiation => radiation.name)

  var medicationListUnique = [...new Set(medicationList)];
  var radiationListUnique = [...new Set(medicationList)];

  var yAxisLabelsSansMedications = ["Medications", "", "",
    "Radiation", "EBRT", "SRS", "WBRT", "", "",
    "Surgery", "", "",
    "Imaging", "CT", "PET CT", "Brain MRI", "", "",
    "Molecular", "", "",
    "Outcome", "", "", "ECOG PS", "", ""]

  var yAxisLabels = [yAxisLabelsSansMedications[0]]
  .concat(medicationListUnique)
  .concat(yAxisLabelsSansMedications.slice(1, yAxisLabelsSansMedications.length))

  store.setYAxisLabels(yAxisLabels)
}

function buildYScale(){
  console.log(store.get())
  var yScale = d3.scaleLinear()
  .domain([0, store.get().yAxisLabels.length])
  .range([store.get().margin.top, store.get().height])
}

function yAxis(){
  makeYAxisLabels()
  var yAxis = d3.axisLeft()
    .scale(buildYScale())
    .ticks(store.get().yAxisLabels.length)
    .tickFormat(function(d, i) {
      return store.get().yAxisLabels[d];
    });
  return yAxis
}


var createYAxis() {
  var axisY = store.get().baseElement.append("g")
   .attr("class", "y axis")
   .attr("id", "yaxis")
   .attr("transform", "translate(" + [150, -store.get().margin.bottom/2] + ")")
   .call(yAxis);
}

export default {
  createXAxis: createXAxis,
  createYAxis: createYAxis
}
