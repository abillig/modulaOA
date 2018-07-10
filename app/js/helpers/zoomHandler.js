import * as d3 from 'd3';
import datesHandler from './datesHandler.js';
import axisHandler from './axisHandler.js';
import dataDrawer from './dataDrawer.js';
import store from './store.js';

function resetZoomLevels(zoomLevel){
  var new_data = datesHandler.prepareNewDataCollection(zoomLevel)
  store.setCurrentData(new_data)
  dataDrawer.transitionCircles()
  axisHandler.transitionAxes()
}

function calculateZoomLevelMapping() {
  var zoomLevelMapping = {}
  var diffInMilliseconds = datesHandler.datasetMinAndMaxDates()[1] - datesHandler.datasetMinAndMaxDates()[0]
  zoomLevelMapping[0] = diffInMilliseconds / 2
  zoomLevelMapping[1] = diffInMilliseconds / 4
  zoomLevelMapping[2] = diffInMilliseconds / 8
  zoomLevelMapping[3] = diffInMilliseconds / 16
  zoomLevelMapping[4] = diffInMilliseconds / 32
  zoomLevelMapping[5] = diffInMilliseconds / 64
  store.setZoomLevelMapping(zoomLevelMapping)
}

function configureSlider(){
  var slider = document.getElementById("myRange");

  slider.oninput = function() {
    if(this.value > 80) {
      resetZoomLevels(5)
    } else if (this.value < 80 && this.value > 60){
      resetZoomLevels(3)
    } else if (this.value < 60 && this.value > 40) {
      resetZoomLevels(2)
    } else if (this.value < 40 && this.value > 20) {
      resetZoomLevels(1)
    } else if (this.value < 20) {
      resetZoomLevels(0)
    }
  }
}

export default {
  resetZoomLevels: resetZoomLevels,
  calculateZoomLevelMapping: calculateZoomLevelMapping,
  configureSlider: configureSlider
}
