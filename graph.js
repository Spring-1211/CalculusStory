const graphRoot = document.querySelector('#graph');
const width = Math.max(320, Math.min(1160, graphRoot?.clientWidth || 960));
const height = window.innerWidth < 680 ? 560 : 650;

async function drawGraph() {
  const data = await fetch('data/knowledge.json').then((response) => response.json());
  const nodes = data.nodes.map((node) => ({...node}));
  const links = data.links.map((link) => ({...link}));
  const svg = d3.select(graphRoot).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('role', 'img').attr('aria-label', '高等数学知识点关系图');
  svg.append('defs').append('marker').attr('id', 'arrowhead').attr('viewBox', '0 -5 10 10').attr('refX', 19).attr('refY', 0).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#7a898a');
  const simulation = d3.forceSimulation(nodes).force('link', d3.forceLink(links).id((node) => node.id).distance(width < 680 ? 100 : 145)).force('charge', d3.forceManyBody().strength(-330)).force('center', d3.forceCenter(width / 2, height / 2)).force('collide', d3.forceCollide(62));
  const link = svg.append('g').selectAll('line').data(links).join('line').attr('class', (d) => d.relation === '同主题关联' ? 'graph-link related' : 'graph-link').attr('marker-end', 'url(#arrowhead)');
  const label = svg.append('g').selectAll('text').data(links).join('text').attr('class', 'graph-edge-label').text((d) => d.relation);
  const node = svg.append('g').selectAll('g').data(nodes).join('g').attr('class', 'graph-node').attr('tabindex', 0).on('click', (_, d) => { window.location.href = `knowledge.html?id=${d.id}`; }).on('keydown', (event, d) => { if (event.key === 'Enter') window.location.href = `knowledge.html?id=${d.id}`; }).call(d3.drag().on('start', (event, d) => { if (!event.active) simulation.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; }).on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; }).on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));
  node.append('circle').attr('r', 31).attr('class', (d) => d.type.includes('分析') ? 'node-circle teal' : 'node-circle coral');
  node.append('text').text((d) => d.title).attr('dy', 52);
  node.append('title').text((d) => `${d.title}：${d.question}`);
  simulation.on('tick', () => { link.attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y).attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y); label.attr('x', (d) => (d.source.x + d.target.x) / 2).attr('y', (d) => (d.source.y + d.target.y) / 2 - 7); node.attr('transform', (d) => `translate(${d.x},${d.y})`); });
}

drawGraph().catch((error) => { graphRoot.innerHTML = `<p class="error-box">图谱暂时无法加载：${error.message}</p>`; });
