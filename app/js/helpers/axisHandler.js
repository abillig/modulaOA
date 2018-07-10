import * as d3 from 'd3';
import datesHandler from './datesHandler.js';
import store from './store.js';
import utils from './utils.js';

function xScale(){
  return d3.scaleTime()
          .rangeRound([150, store.get().width])
}

function addXDomain(scale){
  return scale().domain(datesHandler.datasetMinAndMaxDates());
}

function buildXTimeScale(){
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
  function selectAllMedicationDataPoints(data){
    return data.filter(function(data){
      return data.category == "Medication"
    })
  }
  var medicationList = selectAllMedicationDataPoints(store.get().currentData).map(medication => medication.name)
  // var radiationList = store.get().currentData.radiation.map(radiation => radiation.name)

  var medicationListUnique = [...new Set(medicationList)];
  // var radiationListUnique = [...new Set(medicationList)];

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
  return yScale
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

function formatYAxisHtml(d, i) {
    var categories = ["Medications", "Radiation", "Surgery", "Imaging", "Molecular", "Outcome", "ECOG PS"]
    if(categories.includes(store.get().yAxisLabels[d])) {
      return `<div class="lediv ${store.get().yAxisLabels[d]}-axislabel"><p class="yaxis-label"><i class="fas fa-hospital"></i>&nbsp&nbsp&nbsp${utils.formatString(store.get().yAxisLabels[d])}</p></div>`
    } else {
      return `<p class="yaxis-label subcategory ${store.get().yAxisLabels[d]}-axislabel">&nbsp&nbsp&nbsp${utils.formatString(store.get().yAxisLabels[d])}</p>`
    };
}


function createYAxis() {
  var axisY = store.get().baseElement.append("g")
   .attr("class", "y axis")
   .attr("id", "yaxis")
   .attr("transform", "translate(" + [150, -store.get().margin.bottom/2] + ")")
   .call(yAxis())
   .selectAll("g")
   .append("svg:foreignObject")
   .append("xhtml:div")
   .html(formatYAxisHtml);

   d3.selectAll('.lediv')
   .style("height", function(d,i){
     if (store.get().yAxisLabels[i] == "Medications") {
       return store.get().height + "px";
     } else if (store.get().yAxisLabels[i] !== "") {
       return store.get().height / 16 * 2.2 + "px";
     } else {
       return '0px;'

     }
   })

   // bold the y axis
    store.get().baseElement.select("#yaxis").selectAll("text").attr("class", function(d,i) {
      var categories = ["Medications", "Radiation", "Surgery", "Imaging", "Molecular", "Outcome", "ECOG PS"]
        return "categoryAxisLabel"
    });
}

function transitionAxes(){
  d3.select(".x.axis")
    .transition()
    .duration(900)
    .call(d3.axisBottom(buildXTimeScale()));

  // Update Y Axis
  d3.select(".y.axis")
      .transition()
      .duration(900)
      .call(yAxis());
}

export default {
  createXAxis: createXAxis,
  createYAxis: createYAxis,
  buildXTimeScale: buildXTimeScale,
  transitionAxes: transitionAxes
}
