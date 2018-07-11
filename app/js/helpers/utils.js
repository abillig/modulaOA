import store from '../store';

function formatString(thing) {
  if (thing && thing.length > 15) {
    return `${thing.slice(0, 15)}...`;
  }
  return thing;
}

function getYPositionOf(term) {
  const percentageHeight = store.getYAxisLabels().indexOf(term) / store.getYAxisLabels().length;
  return store.getHeight() * percentageHeight - (store.getYAxisLabels().length - 40);
}

export default {
  formatString,
  getYPositionOf,
};
