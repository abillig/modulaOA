import * as d3 from 'd3';
import store from '../store';

const parseTime = d3.timeParse('%d-%b-%y');

function stringIsAD3Date(string) {
  return parseTime(string);
}

function grabDateFromHealthEvent(healthEventObject) {
  const healthEventKeys = Object.keys(healthEventObject);
  let date;
  healthEventKeys.forEach((key) => {
    if (stringIsAD3Date(healthEventObject[key])) {
      date = healthEventObject[key];
    }
  });
  return date;
}

function collectDates(dataObj) {
  return dataObj.map(grabDateFromHealthEvent);
}

function d3DateLiesWithin(date, startDate, endDate) {
  return parseTime(date) > startDate && parseTime(date) < endDate;
}

function filterDataObjByDate({ dataObj, startDate, endDate }) {
  const filteredDatesCollection = [];
  dataObj.forEach((healthEventObject) => {
    const healthEventKeys = Object.keys(healthEventObject);
    healthEventKeys.forEach((key) => {
      if (stringIsAD3Date(healthEventObject[key])) {
        if (d3DateLiesWithin(healthEventObject[key], startDate, endDate)) {
          filteredDatesCollection.push(healthEventObject);
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
  const currentMedian = medianDate(collectDates(store.getCurrentData()));
  const newUpperLimit = currentMedian.getTime() + store.getZoomLevelMapping()[zoomLevel];
  const newLowerLimit = currentMedian.getTime() - store.getZoomLevelMapping()[zoomLevel];
  const upperLimitString = parseTime(prepareDateString(newUpperLimit));
  const lowerLimitString = parseTime(prepareDateString(newLowerLimit));

  const newData = filterDataObjByDate({
    dataObj: store.getAllData(),
    startDate: lowerLimitString,
    endDate: upperLimitString,
  });
  return newData;
}

function datasetMinAndMaxDates() {
  return d3.extent(collectDates(store.getCurrentData()), d => parseTime(d));
}

export default {
  parseTime,
  collectDates,
  datasetMinAndMaxDates,
  prepareNewDataCollection,
};
