import * as d3 from 'd3';
import store from '../store';

function showTooltip(d) {
  store.get().tooltip.transition()
    .duration(200)
    .style('opacity', 0.9);

  store.get().tooltip.html(`${d.name}  ${d.date}`)
    .style('left', `${d3.event.pageX}px`)
    .style('top', `${d3.event.pageY - 28}px`);
}

function hideTooltip() {
  store.get().tooltip.transition()
    .duration(900)
    .style('opacity', 0);
}

export default {
  showTooltip,
  hideTooltip,
};
