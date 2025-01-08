import React, { useEffect, useRef } from 'react';
import cloud from 'd3-cloud';
import * as d3 from 'd3';

const WordCloudComp = ({ words, width = 500, height = 300 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const layout = cloud()
      .size([width, height])
      .words(
        words.map((word) => ({
          text: word.text,
          size: word.value,
        }))
      )
      .padding(5)
      .rotate(() => Math.random() * 90 - 45) // Random rotation between -45 and 45 degrees
      .font('Impact')
      .fontSize((d) => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear the SVG before rendering

      svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-family', 'Impact')
        .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .style('font-size', (d) => `${d.size}px`)
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }, [words, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default WordCloudComp;
