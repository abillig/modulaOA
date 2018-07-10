let baseElement,
  tooltip,
  width,
  height,
  margin,
  allData,
  currentData,
  yAxisLabels,
  zoomLevelMapping;

exports.setWidth = function (w) {
  width = w;
};

exports.setHeight = function (h) {
  height = h;
};

exports.setMargin = function (m) {
  margin = m;
};

exports.setBaseElement = function (element) {
  baseElement = element;
};

exports.setCurrentData = function (data) {
  currentData = data;
};

exports.setAllData = function (data) {
  allData = data;
};

exports.setYAxisLabels = function (labels) {
  yAxisLabels = labels;
};

exports.setTooltip = function (tt) {
  tooltip = tt;
};

exports.setZoomLevelMapping = function (zlm) {
  zoomLevelMapping = zlm;
};

exports.get = function () {
  return {
    baseElement,
    width,
    height,
    margin,
    allData,
    currentData,
    yAxisLabels,
    tooltip,
    zoomLevelMapping,
  };
};
