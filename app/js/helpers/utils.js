import store from './store.js';

function formatString(thing) {
  if (thing && thing.length > 15) {
    return thing.slice(0, 15) + "..."
  } else {
    return thing
  }
}

function getYPositionOf(term){
  var percentageHeight = store.get().yAxisLabels.indexOf(term) / store.get().yAxisLabels.length
  return store.get().height * percentageHeight - (store.get().yAxisLabels.length - 40);
}

export default {
  formatString: formatString,
  getYPositionOf: getYPositionOf
}
