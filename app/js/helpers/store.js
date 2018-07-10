// These variables will stay in the local scope of this module (in this case, person.js)
var baseElement, tooltip, width, height, margin, currentData, yAxisLabels;

// Make sure your argument name doesn't conflict with variables set above
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

exports.setYAxisLabels = function (labels) {
    yAxisLabels = labels;
};

exports.setTooltip = function (tt) {
    tooltip = tt;
};

// You're returning an object with property values set above
exports.get = function () {
    return {
        baseElement: baseElement,
        width: width,
        height: height,
        margin: margin,
        currentData: currentData,
        yAxisLabels: yAxisLabels,
        tooltip: tooltip
    };
};
