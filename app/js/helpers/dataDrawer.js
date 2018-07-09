import store from './store.js';
import datesHandler from './datesHandler.js';
import axisHandler from './axisHandler.js';
import utils from './utils.js';


function drawCircles(element, data, className) {
  // element.selectAll("circle")
  //   .data(store.get().currentData)
  //   .enter()
  //   .append("circle")
  //   // .on("mouseover", d => showTooltip(d))
  //   // .on("mouseout", d => hideTooltip())
  //   .attr("r", 10)
  //   .attr("cx", function(d, i) {
  //     return axisHandler.xScale(datesHandler.parseTime(d.date))
  //     // return axisHandler.xScale()
  //   })
  //   .attr("cy", function(d) {
  //     return utils.getYPositionOf(d.name)
  //   })
  //   .attr("class", d => className);
}

export default {
  drawCircles: drawCircles
}
