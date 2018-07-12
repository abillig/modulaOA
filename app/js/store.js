let baseElement,
  tooltip,
  width,
  height,
  margin,
  allData,
  currentData,
  yAxisLabels,
  zoomLevelMapping,
  xScale,
  x2;

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

function setXScale(xs) {
  console.log('the store got this thing as an x scale: ' + xs)
  xScale = xs;
}

function setX2(xs2) {
  x2 = xs2;
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

function getXScale(xs) {
  return xScale;
}

function getX2(xs2) {
  return x2;
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
  setXScale,
  setX2,
  getBaseElement,
  getWidth,
  getHeight,
  getMargin,
  getAllData,
  getCurrentData,
  getYAxisLabels,
  getTooltip,
  getZoomLevelMapping,
  getXScale,
  getX2
};
