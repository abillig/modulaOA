import store from '../store';
import datesHandler from './datesHandler';
import axisHandler from './axisHandler';
import tooltipHandler from './tooltipHandler';
import utils from './utils';

function drawCircles(element, data) {
  element.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .on('mouseover', d => tooltipHandler.showTooltip(d))
    .on('mouseout', () => tooltipHandler.hideTooltip())
    .attr('r', 10)
    .attr('cx', d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
    .attr('cy', d => utils.getYPositionOf(d.name))
    .attr('class', d => `${d.category.toLowerCase()}-circle`);
}

function transitionCircles() {
  const dataCollection = store.getBaseElement().selectAll('circle')
    .data(store.getCurrentData());

  dataCollection.exit()
    .remove();

  dataCollection.transition()
    .duration(900)
    .attr('r', 10)
    .attr('cx', d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
    .attr('cy', d => utils.getYPositionOf(d.name))
    .attr('class', d => `${d.category.toLowerCase()}-circle`);

  dataCollection.enter()
    .append('circle')
    .on('mouseover', d => tooltipHandler.showTooltip(d))
    .on('mouseout', () => tooltipHandler.hideTooltip())
    .transition()
    .duration(900)
    .attr('r', 10)
    .attr('cx', d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
    .attr('cy', d => utils.getYPositionOf(d.name))
    .attr('class', d => `${d.category.toLowerCase()}-circle`);
}

export default {
  drawCircles,
  transitionCircles,
};
