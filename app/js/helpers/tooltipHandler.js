import * as d3 from 'd3';
import store from '../store';

export function showTooltip(d) {
  store.getTooltip().transition()
    .duration(200)
    .style('opacity', 0.9);

  store.getTooltip().html(`${d.name}  ${d.date}`)
    .style('left', `${d3.event.pageX}px`)
    .style('top', `${d3.event.pageY - 28}px`);
}

export function hideTooltip() {
  store.getTooltip().transition()
    .duration(900)
    .style('opacity', 0);
}
