let baseElement,
  tooltip,
  width,
  height,
  margin,
  allData,
  currentData,
  yAxisLabels,
  zoomLevelMapping;

function setWidth(w) {
  width = w;
}

function setHeight(h) {
  height = h;
}

function setMargin(m) {
  margin = m;
}

function setBaseElement(element) {
  baseElement = element;
}

function setCurrentData(data) {
  currentData = data;
}

function setAllData(data) {
  allData = data;
}

function setYAxisLabels(labels) {
  yAxisLabels = labels;
}

function setTooltip(tt) {
  tooltip = tt;
}

function setZoomLevelMapping(zlm) {
  zoomLevelMapping = zlm;
}

function getBaseElement() {
  return baseElement;
}

function getWidth() {
  return width;
}

function getHeight() {
  return height;
}

function getMargin() {
  return margin;
}

function getAllData() {
  return allData;
}

function getCurrentData() {
  return currentData;
}

function getYAxisLabels() {
  return yAxisLabels;
}

function getTooltip() {
  return tooltip;
}

function getZoomLevelMapping() {
  return zoomLevelMapping;
}

export default {
  setWidth,
  setHeight,
  setMargin,
  setBaseElement,
  setCurrentData,
  setAllData,
  setYAxisLabels,
  setTooltip,
  setZoomLevelMapping,
  getBaseElement,
  getWidth,
  getHeight,
  getMargin,
  getAllData,
  getCurrentData,
  getYAxisLabels,
  getTooltip,
  getZoomLevelMapping,
};
