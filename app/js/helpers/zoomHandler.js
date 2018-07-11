import datesHandler from './datesHandler';
import axisHandler from './axisHandler';
import dataDrawer from './dataDrawer';
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

export default {
  resetZoomLevels,
  calculateZoomLevelMapping,
  configureSlider,
};
