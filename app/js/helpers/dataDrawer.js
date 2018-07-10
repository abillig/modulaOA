import * as d3 from 'd3';
import store from './store.js';
import datesHandler from './datesHandler.js';
import axisHandler from './axisHandler.js';
import tooltipHandler from './tooltipHandler.js';
import utils from './utils.js';

function drawCircles(element, data) {
  element.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .on("mouseover", d => tooltipHandler.showTooltip(d))
    .on("mouseout", d => tooltipHandler.hideTooltip())
    .attr("r", 10)
    .attr("cx", d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
    .attr("cy", function(d) {
      return utils.getYPositionOf(d.name)
    })
    .attr("class", d => d.category.toLowerCase() + "-circle");
}

function transitionCircles() {
    var dataCollection = store.get().baseElement.selectAll("circle")
      .data(store.get().currentData)

    dataCollection.exit()
      .remove()

    dataCollection.transition()  // Transition from old to new
      .duration(900)  // Length of animation
      .attr("r", 10)
      .attr("cx", d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
      .attr("cy", function(d) {
        return utils.getYPositionOf(d.name)
      })
      .attr("class",  d => d.category.toLowerCase() + "-circle");

    dataCollection.enter()
      .append("circle")
      .on("mouseover", d => tooltipHandler.showTooltip(d))
      .on("mouseout", d => tooltipHandler.hideTooltip())
      .transition()
      .duration(900)  // Length of animation
      .attr("r", 10)
      .attr("cx", d => axisHandler.buildXTimeScale()(datesHandler.parseTime(d.date)))
      .attr("cy", function(d) {
        return utils.getYPositionOf(d.name)
      })
      .attr("class",  d => d.category.toLowerCase() + "-circle");
}

export default {
  drawCircles: drawCircles,
  transitionCircles: transitionCircles
}
