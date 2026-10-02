const graphRoot = document.querySelector('#graph');
let graphDataPromise;
let resizeTimer;

function titleLines(title) {
  const chars = [...title];
  const splitAt = Math.ceil(chars.length / 2);
  return chars.length > 8 ? [chars.slice(0, splitAt).join(''), chars.slice(splitAt).join('')] : [title];
}

function loadGraphData() {
  graphDataPromise ||= fetch('data/knowledge.json').then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
  return graphDataPromise;
}

function fitGraph(svg, zoom, nodes, width, height) {
  const padding = 105;
  const minX = Math.min(...nodes.map((node) => node.x)) - padding;
  const maxX = Math.max(...nodes.map((node) => node.x)) + padding;
  const minY = Math.min(...nodes.map((node) => node.y)) - padding;
  const maxY = Math.max(...nodes.map((node) => node.y)) + padding;
  const scale = Math.min(width / (maxX - minX), height / (maxY - minY), 1.2) * .92;
  const transform = d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(scale)
    .translate(-(minX + maxX) / 2, -(minY + maxY) / 2);
  svg.call(zoom.transform, transform);
}

async function drawGraph() {
  const data = await loadGraphData();
  const width = Math.max(320, graphRoot.clientWidth || 960);
  const height = window.innerWidth < 680 ? 660 : 780;
  const margin = window.innerWidth < 680 ? 72 : 88;
  const nodes = data.nodes.map((node) => ({...node}));
  const links = data.links.map((link) => ({...link}));

  graphRoot.replaceChildren();
  const svg = d3.select(graphRoot).append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-label', '高等数学知识点关系图');
  const scene = svg.append('g');
  const zoom = d3.zoom().scaleExtent([.45, 2.8]).on('zoom', (event) => scene.attr('transform', event.transform));
  svg.call(zoom).on('dblclick.zoom', null);

  svg.append('defs').append('marker').attr('id', 'arrowhead').attr('viewBox', '0 -5 10 10').attr('refX', 19).attr('refY', 0).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#7a898a');
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((node) => node.id).distance(width < 680 ? 125 : 175))
    .force('charge', d3.forceManyBody().strength(-390))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide(76));

  const link = scene.append('g').selectAll('line').data(links).join('line').attr('class', (d) => d.relation === '同主题关联' ? 'graph-link related' : 'graph-link').attr('marker-end', 'url(#arrowhead)');
  const label = scene.append('g').selectAll('text').data(links).join('text').attr('class', 'graph-edge-label').style('opacity', width < 680 ? 0 : .68).text((d) => d.relation);
  const node = scene.append('g').selectAll('g').data(nodes).join('g').attr('class', 'graph-node').attr('tabindex', 0)
    .on('click', (_, d) => { window.location.href = `knowledge.html?id=${d.id}`; })
    .on('keydown', (event, d) => { if (event.key === 'Enter') window.location.href = `knowledge.html?id=${d.id}`; })
    .call(d3.drag()
      .on('start', (event, d) => { event.sourceEvent.stopPropagation(); if (!event.active) simulation.alphaTarget(.2).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (event, d) => { d.fx = Math.max(margin, Math.min(width - margin, event.x)); d.fy = Math.max(margin, Math.min(height - margin, event.y)); })
      .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));
  node.append('circle').attr('r', 31).attr('class', (d) => d.type.includes('分析') ? 'node-circle teal' : 'node-circle coral');
  node.append('text').attr('dy', (d) => titleLines(d.title).length > 1 ? 47 : 48).each(function(d) {
    titleLines(d.title).forEach((line, index) => d3.select(this).append('tspan').attr('x', 0).attr('dy', index === 0 ? 0 : 16).text(line));
  });
  node.filter((d) => d.status).append('text').attr('class', 'graph-status').attr('dy', 82).text((d) => d.status);
  node.append('title').text((d) => `${d.title}：${d.question}`);

  const tick = () => {
    nodes.forEach((d) => {
      d.x = Math.max(margin, Math.min(width - margin, d.x));
      d.y = Math.max(margin, Math.min(height - margin, d.y));
    });
    link.attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y).attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y);
    label.attr('x', (d) => (d.source.x + d.target.x) / 2).attr('y', (d) => (d.source.y + d.target.y) / 2 - 7);
    node.attr('transform', (d) => `translate(${d.x},${d.y})`);
  };
  simulation.on('tick', tick).on('end', () => fitGraph(svg, zoom, nodes, width, height));
  window.setTimeout(() => fitGraph(svg, zoom, nodes, width, height), 550);
}

window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => drawGraph().catch(showGraphError), 180);
});

function showGraphError(error) {
  graphRoot.innerHTML = `<p class="error-box">图谱暂时无法加载：${error.message}</p>`;
}

drawGraph().catch(showGraphError);
