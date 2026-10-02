const root = document.querySelector('#assistant-root');
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function buildPrompts(node, prerequisites) {
  const context = `知识点：${node.title}\n教材位置：${node.chapter}\n核心问题：${node.question}\n定义：${node.definition}\n重点：${node.focus.join('；')}\n前置知识：${prerequisites || '暂无记录'}`;
  return [
    {title: '从问题重新讲懂', purpose: '动机与思想', text: `${context}\n\n请面向大一学生解释这个知识点。先给一个自然问题，再说明旧工具为什么不够，最后引出定义。使用两个简单例子和一个反例；区分史实与教学类比；不确定的历史细节请明确说不确定，不要编造人物轶事。`},
    {title: '用反例检查边界', purpose: '概念辨析', text: `${context}\n\n请设计三个由浅入深的概念辨析题：一个正例、一个反例、一个容易误判的边界例子。先只给问题和逐级提示，最后单独给答案。每个答案都指出定义中的哪一个条件起作用，避免重复计算题。`},
    {title: '寻找现代应用', purpose: '迁移应用', text: `${context}\n\n请分别给出这个思想在物理或工程、计算机科学、AI 中的一个真实应用。每个应用必须明确说明“数学对象如何对应到实际对象”，并区分严格使用、近似类比和仅有启发性的联系；不要为了提到 AI 而牵强附会。`},
    {title: '生成 Lean4 学习草稿', purpose: '形式化', text: `${context}\n\n请把定义或一个最简单命题写成 Lean4 + mathlib 教学代码。注明 mathlib 版本假设、每行对应的自然语言含义，以及代码是否实际编译验证。若无法确认定理名，保留 sorry 并标为“未验证草稿”，不要声称已经形式化证明。`}
  ];
}

async function render() {
  const [knowledge, people] = await Promise.all(['knowledge', 'people'].map((name) => fetch(`data/${name}.json`).then((response) => response.json())));
  const requested = new URLSearchParams(location.search).get('id');
  const node = knowledge.nodes.find((item) => item.id === requested) || knowledge.nodes[0];
  const incoming = knowledge.links.filter((link) => link.target === node.id && link.relation !== '同主题关联');
  const prerequisites = incoming.map((link) => knowledge.nodes.find((item) => item.id === link.source)?.title).filter(Boolean).join('、');
  const names = (node.people || []).map((id) => people.find((person) => person.id === id)?.name).filter(Boolean).join('、');
  const prompts = buildPrompts(node, prerequisites);
  root.innerHTML = `<header class="topbar"><a class="brand" href="index.html"><span class="brand-mark">C</span><span>CalculusStory</span></a><nav class="unified-nav" aria-label="主导航"><a href="index.html#chapters">章节</a><a href="index.html#method">学习方法</a><a href="graph.html">知识图谱</a><a href="people.html">数学家</a><a href="exercises.html">习题</a><a href="timeline.html">时间线</a><a href="formalization.html">Lean4</a><a class="active" href="ai.html">AI 辅助</a><a href="https://github.com/Spring-1211/CalculusStory">GitHub</a></nav></header><main class="portal-page"><div class="portal-column"><p class="eyebrow">AI + 数学 · 轻量辅助层</p><h1>带着边界去提问</h1><p class="reading-lead">这里不替你思考，也不把 AI 回答当成史料或证明。它把当前知识点组织成可复制的提示词，帮助你追问动机、反例、应用与形式化。</p><div class="assistant-context"><label for="topic-select">当前知识点</label><select id="topic-select">${knowledge.nodes.map((item) => `<option value="${item.id}" ${item.id === node.id ? 'selected' : ''}>${escapeHtml(item.title)}</option>`).join('')}</select><p><strong>核心问题：</strong>${escapeHtml(node.question)}</p><p><strong>关联人物：</strong>${escapeHtml(names || '暂无')}</p></div><div class="prompt-grid">${prompts.map((prompt) => `<article class="prompt-card"><span>${escapeHtml(prompt.purpose)}</span><h2>${escapeHtml(prompt.title)}</h2><pre><code>${escapeHtml(prompt.text)}</code></pre><button class="button secondary" type="button" data-copy="${encodeURIComponent(prompt.text)}">复制提示词</button></article>`).join('')}</div><section class="ai-boundary"><h2>使用边界</h2><p>历史事实回到来源核验；数学结论回到定义和证明核验；Lean 代码只有实际编译后才能标记“已验证”。本站不上传你的问题，也不调用外部模型。</p></section></div></main>`;
  document.querySelector('#topic-select').addEventListener('change', (event) => { location.href = `ai.html?id=${event.target.value}`; });
}

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
  setTimeout(() => { button.textContent = original; }, 1800);
});

render().catch((error) => { root.innerHTML = `<p class="error-box">AI 辅助页无法加载：${escapeHtml(error.message)}</p>`; });
