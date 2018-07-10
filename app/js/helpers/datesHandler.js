import * as d3 from 'd3';
import store from '../store';

const parseTime = d3.timeParse('%d-%b-%y');

function collectDates(dataObj) {
  const datesCollection = [];
  dataObj.forEach((dataPoint) => {
    const entryKeys = Object.keys(dataPoint);
    entryKeys.forEach((key) => {
      if (parseTime(dataPoint[key])) {
        datesCollection.push(dataPoint[key]);
      }
    });
  });
  return datesCollection;
}

function filterDataObjByDate(dataObj, startDate, endDate) {
  const filteredDatesCollection = [];
  dataObj.forEach((dataPoint) => {
    const entryKeys = Object.keys(dataPoint);
    entryKeys.forEach((key) => {
      if (parseTime(dataPoint[key])) {
        if (parseTime(dataPoint[key]) > startDate && parseTime(dataPoint[key]) < endDate) {
          filteredDatesCollection.push(dataPoint);
        }
      }
    });
  });
  return filteredDatesCollection;
}

function sortDates(datesCollection) {
  const timesCollection = datesCollection.map(date => parseTime(date));

  const sorted = timesCollection.sort((a, b) => a - b);

  return sorted;
}

function medianDate(datesCollection) {
  const sortedDates = sortDates(datesCollection);
  const median = sortedDates[Math.floor(sortedDates.length / 2)];
  return median;
}

function prepareDateString(dateInMilliseconds) {
  const dateToConvert = new Date(dateInMilliseconds);
  const day = dateToConvert.getDate();
  const monthNum = dateToConvert.getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthString = months[monthNum];
  const year = String(dateToConvert.getFullYear());
  const editedYear = year.slice(year.length - 2, year.length);
  const dateString = `${day}-${monthString}-${editedYear}`;
  return dateString;
}

function prepareNewDataCollection(zoomLevel) {
  const currentMedian = medianDate(collectDates(store.get().currentData));
  const newUpperLimit = currentMedian.getTime() + store.get().zoomLevelMapping[zoomLevel];
  const newLowerLimit = currentMedian.getTime() - store.get().zoomLevelMapping[zoomLevel];
  const upperLimitString = parseTime(prepareDateString(newUpperLimit));
  const lowerLimitString = parseTime(prepareDateString(newLowerLimit));

  const newData = filterDataObjByDate(store.get().allData, lowerLimitString, upperLimitString);
  return newData;
}

function datasetMinAndMaxDates() {
  return d3.extent(collectDates(store.get().currentData), d => parseTime(d));
}

export default {
  parseTime,
  collectDates,
  datasetMinAndMaxDates,
  prepareNewDataCollection,
};
