import * as d3 from 'd3';
import axisHandler from './axisHandler';
import dataDrawer from './dataDrawer';
import zoomHandler from './zoomHandler';
import store from '../store';

function initialChartSetup() {
  const svg = d3.select('#charts');
  const margin = {
    top: 20, right: 20, bottom: 30, left: 0,
  };
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  store.setWidth(width);
  store.setHeight(height);
  store.setBaseElement(svg);
  store.setMargin(margin);
  store.setTooltip(tooltip);
}

function buildAxes() {
  axisHandler.createXAxis();
  axisHandler.createYAxis();
}

function consolidateData(data) {
  const dataKeys = Object.keys(data);
  let consolidatedData = [];
  dataKeys.forEach((key) => {
    consolidatedData = consolidatedData.concat(data[key]);
  });
  return consolidatedData;
}

function generateChart(data) {
  store.setAllData(consolidateData(data));
  store.setCurrentData(consolidateData(data));
  initialChartSetup();
  buildAxes();

  dataDrawer.drawCircles(store.getBaseElement(), store.getCurrentData());
  zoomHandler.calculateZoomLevelMapping();
  zoomHandler.configureSlider();
}

export default {
  generateChart,
};
