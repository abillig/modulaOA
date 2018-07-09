import * as d3 from 'd3';

var parseTime = d3.timeParse("%d-%b-%y");

function collectDates(dataObj) {
  var datesCollection = []
  var dataObjkeys = Object.keys(dataObj)
  dataObjkeys.forEach(function(key){
    dataObj[key].forEach(function(entry){
      var entryKeys = Object.keys(entry)
      entryKeys.forEach(function(key){
        if(parseTime(entry[key])){
          datesCollection.push(entry[key])
        }
      })
    })
  })
  return datesCollection
}

export default {
  parseTime: parseTime,
  collectDates: collectDates
}
