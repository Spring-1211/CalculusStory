const root = document.querySelector('#timeline-root');
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

async function renderTimeline() {
  const [events, people, knowledge] = await Promise.all(['timeline', 'people', 'knowledge'].map((name) => fetch(`data/${name}.json`).then((response) => response.json())));
  const sorted = [...events].sort((a, b) => a.year - b.year);
  root.innerHTML = `<header class="topbar"><a class="brand" href="index.html"><span class="brand-mark">C</span><span>CalculusStory</span></a><nav><a href="graph.html">知识图谱</a><a href="people.html">数学家</a><a href="exercises.html">习题</a><a href="formalization.html">Lean4</a><a href="ai.html">AI 辅助</a></nav></header><main class="portal-page"><div class="portal-column"><p class="eyebrow">思想史 · 问题如何接力</p><h1>微积分不是一天发明的</h1><p class="reading-lead">这条时间线只保留影响概念理解的节点。它不争夺“第一位发明者”，而是展示问题、语言和严格性如何一代代改变。</p><div class="timeline">${sorted.map((event) => { const person = people.find((item) => item.id === event.person); const node = knowledge.nodes.find((item) => item.id === event.knowledge); return `<article><div class="timeline-date">${esc(event.date)}</div><div class="timeline-body"><h2>${esc(event.title)}</h2><p>${esc(event.text)}</p><div class="timeline-links">${person ? `<a href="people.html?id=${person.id}">${esc(person.name)}</a>` : ''}${node ? `<a href="knowledge.html?id=${node.id}">${esc(node.title)}</a>` : ''}<a href="${esc(event.source)}">史料来源</a></div></div></article>`; }).join('')}</div></div></main>`;
}

renderTimeline().catch((error) => { root.innerHTML = `<p class="error-box">时间线无法加载：${esc(error.message)}</p>`; });
