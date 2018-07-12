import * as d3 from 'd3';
import datesHandler from './datesHandler';
import axisHandler from './axisHandler';
import dataDrawer from './dataDrawer';
import utils from './utils';
import store from '../store';

function resetZoomLevels(zoomLevel) {
  const newData = datesHandler.prepareNewDataCollection(zoomLevel);
  store.setCurrentData(newData);
  dataDrawer.transitionCircles();
  axisHandler.transitionAxes();
}

function calculateZoomLevelMapping() {
  // not cleaning up because this will all be rewritten
  const zoomLevelMapping = {};
  const latestDate = datesHandler.datasetMinAndMaxDates()[1];
  const earliestDate = datesHandler.datasetMinAndMaxDates()[0];

  const diffInMilliseconds = latestDate - earliestDate;
  zoomLevelMapping[0] = diffInMilliseconds / 2;
  zoomLevelMapping[1] = diffInMilliseconds / 4;
  zoomLevelMapping[2] = diffInMilliseconds / 8;
  zoomLevelMapping[3] = diffInMilliseconds / 16;
  zoomLevelMapping[4] = diffInMilliseconds / 32;
  zoomLevelMapping[5] = diffInMilliseconds / 64;
  store.setZoomLevelMapping(zoomLevelMapping);
}

function configureSlider() {
  // not cleaning up because this will all be rewritten
  const slider = document.getElementById('myRange');

  slider.oninput = function () {
    if (this.value > 80) {
      resetZoomLevels(5);
    } else if (this.value < 80 && this.value > 60) {
      resetZoomLevels(3);
    } else if (this.value < 60 && this.value > 40) {
      resetZoomLevels(2);
    } else if (this.value < 40 && this.value > 20) {
      resetZoomLevels(1);
    } else if (this.value < 20) {
      resetZoomLevels(0);
    }
  };
}

function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  var t = d3.event.transform;
  console.log('here are the d3 event keys: ' + Object.keys(d3.event))
  console.log('here are the d3 event values: ' + Object.values(d3.event))
  console.log('here is t: ' + t)
  console.log('here is t.rescaleX((store.getX2()).domain())' + t.rescaleX(store.getX2()).domain())
  console.log('here is t after that: ' + t)

  store.getXScale().domain(t.rescaleX(store.getX2()).domain());
  store.getBaseElement().selectAll("circle")
    .attr("cx", d => store.getXScale()(datesHandler.parseTime(d.date)))
    .attr("cy", function(d){
      return utils.getYPositionOf(d.name)
    })
  store.getBaseElement().select(".x.axis").call(d3.axisBottom(store.getXScale()));
}
//
// .attr('cx', d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
// .attr('cy', d => utils.getYPositionOf(d.name))

function zoom(){
  return d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [store.getWidth(), store.getHeight()]])
    .extent([[0, 0], [store.getWidth(), store.getHeight()]])
    .on("zoom", zoomed);
}

function zoomSlider(thing){
  console.log('well the input is' + thing)
  console.log('if there was range it would be' + thing.rescaleX(store.getX2()).domain())
  // store.getXScale().domain(t.rescaleX(store.getX2()).domain());
  // store.getBaseElement().selectAll("circle")
  //   .attr("cx", d => store.getXScale()(datesHandler.parseTime(d.date)))
  //   .attr("cy", function(d){
  //     return utils.getYPositionOf(d.name)
  //   })
  // store.getBaseElement().select(".x.axis").call(d3.axisBottom(store.getXScale()));
}


export default {
  resetZoomLevels,
  calculateZoomLevelMapping,
  configureSlider,
  zoom,
  zoomed,
  zoomSlider
};
