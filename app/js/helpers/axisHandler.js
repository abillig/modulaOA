import * as d3 from 'd3';
import datesHandler from './datesHandler';
import store from '../store';
import utils from './utils';

function xScale() {
  return d3.scaleTime()
    .rangeRound([150, store.get().width]);
}

function addXDomain(scale) {
  return scale().domain(datesHandler.datasetMinAndMaxDates());
}

function buildXTimeScale() {
  return addXDomain(xScale);
}

function createXAxis() {
  const { baseElement, height } = store.get();

  baseElement.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(buildXTimeScale()));
}

function makeYAxisLabels() {
  function selectMedicationDataPoints(data) {
    return data.filter(dataPoint => dataPoint.category === 'Medication');
  }
  const medicationList = selectMedicationDataPoints(store.get().currentData).map(medication => medication.name);
  const medicationListUnique = [...new Set(medicationList)];

  const yAxisLabelsSansMedications = ['Medications', '', '',
    'Radiation', 'EBRT', 'SRS', 'WBRT', '', '',
    'Surgery', '', '',
    'Imaging', 'CT', 'PET CT', 'Brain MRI', '', '',
    'Molecular', '', '',
    'Outcome', '', '', 'ECOG PS', '', ''];

  const yAxisLabels = [yAxisLabelsSansMedications[0]]
    .concat(medicationListUnique)
    .concat(yAxisLabelsSansMedications.slice(1, yAxisLabelsSansMedications.length));

  store.setYAxisLabels(yAxisLabels);
}

function buildYScale() {
  const yScale = d3.scaleLinear()
    .domain([0, store.get().yAxisLabels.length])
    .range([store.get().margin.top, store.get().height]);
  return yScale;
}

function yAxis() {
  makeYAxisLabels();
  const yAxis = d3.axisLeft()
    .scale(buildYScale())
    .ticks(store.get().yAxisLabels.length)
    .tickFormat(d => store.get().yAxisLabels[d]);
  return yAxis;
}

function dataPointBelongsToASubcategory(d) {
  const mainCategories = ['Medications', 'Radiation', 'Surgery', 'Imaging', 'Molecular', 'Outcome', 'ECOG PS'];
  return mainCategories.includes(store.get().yAxisLabels[d]) === false;
}

function axisLabelClass(i) {
  return `${store.get().yAxisLabels[i]}-axislabel`;
}

function axisLabelText(d) {
  return utils.formatString(store.get().yAxisLabels[d]);
}

function formatYAxisHtml(d, i) {
  if (dataPointBelongsToASubcategory(d, i)) {
    return `<p class="yaxis-label subcategory ${axisLabelClass(i)}">&nbsp&nbsp&nbsp${axisLabelText(d)}</p>`;
  }
  return `<div class="axisLabel ${axisLabelClass(i)}"><p class="yaxis-label"><i class="fas fa-hospital"></i>&nbsp&nbsp&nbsp${axisLabelText(d)}</p></div>`;
}

function boldCategoryLabels() {
  // bold the y axis
  store.get().baseElement.select('#yaxis').selectAll('text').attr('class', 'categoryAxisLabel');
}

function createYAxis() {
  store.get().baseElement.append('g')
    .attr('class', 'y axis')
    .attr('id', 'yaxis')
    .attr('transform', `translate(${[150, -store.get().margin.bottom / 2]})`)
    .call(yAxis())
    .selectAll('g')
    .append('svg:foreignObject')
    .append('xhtml:div')
    .html(formatYAxisHtml);

  boldCategoryLabels();
}

function transitionAxes() {
  d3.select('.x.axis')
    .transition()
    .duration(900)
    .call(d3.axisBottom(buildXTimeScale()));

  d3.select('.y.axis')
    .transition()
    .duration(900)
    .call(yAxis());
}

export default {
  createXAxis,
  createYAxis,
  buildXTimeScale,
  transitionAxes,
};
