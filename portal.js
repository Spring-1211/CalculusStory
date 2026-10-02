const DATA_FILES = ['knowledge', 'people', 'exercises', 'formalization'];

async function loadData() {
  const entries = await Promise.all(DATA_FILES.map(async (name) => {
    const response = await fetch(`data/${name}.json`);
    if (!response.ok) throw new Error(`无法加载 ${name}.json`);
    return [name, await response.json()];
  }));
  return Object.fromEntries(entries);
}

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const byId = (items, id) => items.find((item) => item.id === id);
const pill = (text) => `<span class="data-pill">${esc(text)}</span>`;
const linkTo = (label, path) => `<a class="inline-link" href="${path}">${esc(label)}</a>`;
const list = (items, render = esc) => items?.length ? `<ul class="clean-list">${items.map((item) => `<li>${render(item)}</li>`).join('')}</ul>` : '<p class="muted">暂无记录。</p>';
const copyButton = (text, label = '复制代码') => `<button class="button secondary copy-button" type="button" data-copy="${encodeURIComponent(text)}">${esc(label)}</button>`;

function shell(title, eyebrow, body) {
  document.title = `${title}｜CalculusStory`;
  const page = document.body.dataset.portal;
  document.querySelector('#portal-root').innerHTML = `<header class="topbar"><a class="brand" href="index.html"><span class="brand-mark">C</span><span>CalculusStory</span></a><nav class="unified-nav" aria-label="主导航"><a class="${page === 'knowledge' ? 'active' : ''}" href="index.html#chapters">章节</a><a href="index.html#method">学习方法</a><a href="graph.html">知识图谱</a><a class="${page === 'people' ? 'active' : ''}" href="people.html">数学家</a><a class="${page === 'exercises' ? 'active' : ''}" href="exercises.html">习题</a><a href="timeline.html">时间线</a><a class="${page === 'formalization' ? 'active' : ''}" href="formalization.html">Lean4</a><a href="ai.html">AI 辅助</a><a href="https://github.com/Spring-1211/CalculusStory">GitHub</a></nav></header><main class="portal-page"><div class="portal-column"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1>${body}</div></main>`;
}

function renderKnowledge(data) {
  const id = new URLSearchParams(location.search).get('id') || 'mapping-function';
  const node = byId(data.knowledge.nodes, id) || data.knowledge.nodes[0];
  const people = (node.people || []).map((personId) => byId(data.people, personId)).filter(Boolean);
  const exercises = (node.exercises || []).map((exerciseId) => byId(data.exercises, exerciseId)).filter(Boolean);
  const formal = byId(data.formalization, node.formalization);
  const related = data.knowledge.links.filter((link) => link.relation === '同主题关联' && (link.source === node.id || link.target === node.id));
  const incoming = data.knowledge.links.filter((link) => link.relation !== '同主题关联' && link.target === node.id);
  const outgoing = data.knowledge.links.filter((link) => link.relation !== '同主题关联' && link.source === node.id);
  const relatedNode = (link) => link.source === node.id ? link.target : link.source;
  shell(node.title, `${node.chapter} · ${node.type}`, `<p class="reading-lead">${esc(node.summary)}</p><div class="question-strip"><strong>先问</strong><p>${esc(node.question)}</p></div><div class="portal-grid"><section><h2>定义与重点</h2><p>${esc(node.definition)}</p><h3>本节抓手</h3>${list(node.focus, esc)}<h3>应用场景</h3>${list(node.applications, esc)}</section><section><h2>交叉引用</h2><h3>前置依赖</h3>${list(incoming, (link) => `${pill('前置')} ${linkTo(byId(data.knowledge.nodes, link.source)?.title || link.source, `knowledge.html?id=${link.source}`)}`)}<h3>后继延伸</h3>${list(outgoing, (link) => `${pill('后继')} ${linkTo(byId(data.knowledge.nodes, link.target)?.title || link.target, `knowledge.html?id=${link.target}`)}`)}<h3>同主题关联</h3>${list(related, (link) => { const other = relatedNode(link); return `${pill('关联')} ${linkTo(byId(data.knowledge.nodes, other)?.title || other, `knowledge.html?id=${other}`)}`; })}<h3>关联数学家</h3>${list(people, (person) => linkTo(person.name, `people.html?id=${person.id}`))}<h3>配套习题</h3>${list(exercises, (exercise) => linkTo(exercise.title, `exercises.html?id=${exercise.id}`))}</section></div><div class="action-row"><a class="button secondary" href="ai.html?id=${node.id}">用 AI 提示词继续追问</a></div><section class="formal-panel"><div class="panel-heading"><div><p class="eyebrow">形式化验证</p><h2>${esc(formal?.title || '尚未映射')}</h2></div><span class="status-tag">${esc(formal?.status || '待补')}</span></div>${formal ? `<p><strong>教材陈述：</strong>${esc(formal.natural)}</p><pre><code>${esc(formal.code)}</code></pre><p class="muted">${esc(formal.notes)}</p><div class="action-row">${copyButton(formal.code, '复制 Lean 代码')}<a class="button secondary" href="formalization.html?id=${formal.id}">查看完整映射</a></div>` : '<p class="muted">该知识点暂未建立 Lean4 映射。</p>'}</section>`);
}

function renderPeople(data) {
  const id = new URLSearchParams(location.search).get('id');
  if (id) {
    const person = byId(data.people, id) || data.people[0];
    const nodes = person.nodes.map((nodeId) => byId(data.knowledge.nodes, nodeId)).filter(Boolean);
    shell(person.name, `${person.years} · ${person.tag}`, `<p class="reading-lead">${esc(person.summary)}</p><div class="person-facts"><div><span>核心贡献</span><p>${esc(person.contribution)}</p></div><div><span>核心思想</span><p>${esc(person.thought)}</p></div></div><h2>放回历史问题</h2><p>${esc(person.history)}</p><h2>教材知识点</h2>${list(nodes, (node) => linkTo(node.title, `knowledge.html?id=${node.id}`))}<p class="source-note">史料来源：<a href="${esc(person.source)}">${esc(person.source)}</a></p>`);
    return;
  }
  shell('数学家人物库', '人物 · 思想 · 知识点', `<p class="reading-lead">人物不是装饰性名片，而是帮助我们看见问题从哪里来、一个定义在当时解决了什么。</p><div class="person-grid">${data.people.map((person) => `<a class="person-card" href="people.html?id=${person.id}"><span class="card-index">${esc(person.years)}</span><h2>${esc(person.name)}</h2><p>${esc(person.summary)}</p><span class="card-link">查看思想线索 →</span></a>`).join('')}</div>`);
}

function renderExercises(data) {
  const id = new URLSearchParams(location.search).get('id');
  if (id) {
    const exercise = byId(data.exercises, id) || data.exercises[0];
    const nodes = exercise.knowledge.map((nodeId) => byId(data.knowledge.nodes, nodeId)).filter(Boolean);
    const people = (exercise.people || []).map((personId) => byId(data.people, personId)).filter(Boolean);
    shell(exercise.title, `习题 · ${exercise.difficulty}`, `<div class="question-strip"><strong>题目</strong><p>${esc(exercise.prompt)}</p></div><h2>思考提示</h2><p>${esc(exercise.hint)}</p><details class="answer-box"><summary>展开参考答案</summary><p>${esc(exercise.answer)}</p></details><h2>关联知识点</h2>${list(nodes, (node) => linkTo(node.title, `knowledge.html?id=${node.id}`))}<h2>关联人物</h2>${list(people, (person) => linkTo(person.name, `people.html?id=${person.id}`))}<p class="source-note">题目类型：${esc(exercise.source?.kind || '配套题')}。页面不自动生成 AI 解答，AI 仅作为可选提示入口。</p>`);
    return;
  }
  shell('配套习题库', '问题 · 反例 · 构造 · 证明', `<p class="reading-lead">先判断概念，再计算。每道题都绑定知识点和人物，做完题可以回到它所依赖的思想。</p><div class="exercise-table">${data.exercises.map((exercise) => `<a href="exercises.html?id=${exercise.id}"><span>${esc(exercise.difficulty)}</span><strong>${esc(exercise.title)}</strong><small>${esc(exercise.prompt)}</small></a>`).join('')}</div><p class="source-note">开源题库入口见仓库 <a href="open-resources.html">复用资源清单</a>；第三方内容按原许可证使用，不复制受限题面。</p>`);
}

function renderFormalization(data) {
  const id = new URLSearchParams(location.search).get('id');
  if (id) {
    const item = byId(data.formalization, id) || data.formalization[0];
    const node = byId(data.knowledge.nodes, item.knowledge);
    shell(item.title, `Lean4 形式化 · ${item.status}`, `<div class="question-strip"><strong>教材陈述</strong><p>${esc(item.natural)}</p></div><h2>代码</h2><pre><code>${esc(item.code)}</code></pre><div class="action-row">${copyButton(item.code, '复制 Lean 代码')}<a class="button secondary" href="https://live.lean-lang.org/">打开 Lean 4 Web</a></div><p>${esc(item.notes)}</p><h2>关联</h2><p>${node ? linkTo(node.title, `knowledge.html?id=${node.id}`) : ''}</p><p class="source-note">Lean 文件：<code>${esc(item.leanFile)}</code></p>`);
    return;
  }
  shell('Lean4 形式化代码映射', '自然语言定理 ↔ 可检查代码', `<p class="reading-lead">这里不追求把整本高数瞬间研究级形式化，而是诚实标出：什么已经验证，什么是 mathlib 现成定理，什么是教学定义，什么仍待补证明。</p><div class="exercise-table">${data.formalization.map((item) => `<a href="formalization.html?id=${item.id}"><span>${esc(item.status)}</span><strong>${esc(item.title)}</strong><small>${esc(item.natural)}</small></a>`).join('')}</div>`);
}

loadData().then((data) => {
  const page = document.body.dataset.portal;
  if (page === 'knowledge') renderKnowledge(data);
  if (page === 'people') renderPeople(data);
  if (page === 'exercises') renderExercises(data);
  if (page === 'formalization') renderFormalization(data);
}).catch((error) => { document.querySelector('#portal-root').innerHTML = `<p class="error-box">${esc(error.message)}</p>`; });

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* use the local fallback below */ }
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const original = button.textContent;
  try {
    button.textContent = await copyText(decodeURIComponent(button.dataset.copy)) ? '已复制' : '复制失败，请手动选择';
  } catch {
    button.textContent = '复制失败，请手动选择';
  }
  window.setTimeout(() => { button.textContent = original; }, 1800);
});
