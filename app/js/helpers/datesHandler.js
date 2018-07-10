import * as d3 from 'd3';
import store from './store.js';
var parseTime = d3.timeParse("%d-%b-%y");

function collectDates(dataObj) {
  var datesCollection = []
  dataObj.forEach(function(dataPoint){
    var entryKeys = Object.keys(dataPoint)
    entryKeys.forEach(function(key){
      if(parseTime(dataPoint[key])){
        datesCollection.push(dataPoint[key])
      }
    })
  })
  return datesCollection
}

function filterDataObjByDate(dataObj, start_date, end_date){
  var filteredDatesCollection = []
  dataObj.forEach(function(dataPoint){
    var entryKeys = Object.keys(dataPoint)
    entryKeys.forEach(function(key){
      if(parseTime(dataPoint[key])){
        if(parseTime(dataPoint[key]) > start_date && parseTime(dataPoint[key]) < end_date){
          filteredDatesCollection.push(dataPoint)
        }
      }
    })
  })
  return filteredDatesCollection
}

function sortDates(datesCollection){
  var timesCollection = datesCollection.map(function(date){
    return parseTime(date)
  })

  const sorted = timesCollection.sort((a, b) => {
    return a - b
  })

  return sorted
}

function medianDate(datesCollection){
  var sortedDates = sortDates(datesCollection)
  var median = sortedDates[Math.floor(sortedDates.length / 2)]
  return median
}

function prepareNewDataCollection(zoomLevel) {
  var currentMedian = medianDate(collectDates(store.get().currentData))
  var newUpperLimit = currentMedian.getTime() + store.get().zoomLevelMapping[zoomLevel]
  var newLowerLimit = currentMedian.getTime() - store.get().zoomLevelMapping[zoomLevel]
  var upperLimitString = parseTime(prepareDateString(newUpperLimit))
  var lowerLimitString = parseTime(prepareDateString(newLowerLimit))

  var new_data = filterDataObjByDate(store.get().allData, lowerLimitString, upperLimitString)
  return new_data
}

function datasetMinAndMaxDates(){
  return d3.extent(collectDates(store.get().currentData), function(d) { return parseTime(d); })
}

function prepareDateString(dateInMilliseconds) {
  var dateToConvert = new Date(dateInMilliseconds)
  var day = dateToConvert.getDate()
  var monthNum = dateToConvert.getMonth()
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var monthString = month[monthNum];
  var year = String(dateToConvert.getFullYear())
  var editedYear = year.slice(year.length - 2, year.length)
  var dateString = `${day}-${monthString}-${editedYear}`
  return dateString
}

export default {
  parseTime: parseTime,
  collectDates: collectDates,
  datasetMinAndMaxDates: datasetMinAndMaxDates,
  prepareNewDataCollection: prepareNewDataCollection
}
