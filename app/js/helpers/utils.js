import store from '../store';

function formatString(thing) {
  if (thing && thing.length > 15) {
    return `${thing.slice(0, 15)}...`;
  }
  return thing;
}

function getYPositionOf(term) {
  const percentageHeight = store.get().yAxisLabels.indexOf(term) / store.get().yAxisLabels.length;
  return store.get().height * percentageHeight - (store.get().yAxisLabels.length - 40);
}

export default {
  formatString,
  getYPositionOf,
};
