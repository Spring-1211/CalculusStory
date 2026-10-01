import { readFile } from 'node:fs/promises';

const load = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));
const errors = [];
const ids = (items, label) => {
  const seen = new Set();
  for (const item of items) {
    if (!item.id) errors.push(`${label}: 缺少 id`);
    else if (seen.has(item.id)) errors.push(`${label}: 重复 id ${item.id}`);
    seen.add(item.id);
  }
  return seen;
};
const requireRef = (set, value, label) => { if (value && !set.has(value)) errors.push(`${label}: 未知 id ${value}`); };

const [knowledge, people, exercises, formalization, timeline] = await Promise.all([
  load('data/knowledge.json'), load('data/people.json'), load('data/exercises.json'), load('data/formalization.json'), load('data/timeline.json')
]);
const nodeIds = ids(knowledge.nodes, '知识点');
const personIds = ids(people, '人物');
const exerciseIds = ids(exercises, '习题');
const formalIds = ids(formalization, '形式化');
const timelineIds = new Set(timeline.map((item) => `${item.year}:${item.title}`));
if (timelineIds.size !== timeline.length) errors.push('时间线: 存在重复年份与标题');

for (const link of knowledge.links) {
  requireRef(nodeIds, link.source, '知识图谱 source');
  requireRef(nodeIds, link.target, '知识图谱 target');
  if (!['前置依赖', '后继延伸', '同主题关联'].includes(link.relation)) errors.push(`知识图谱: 未知关系 ${link.relation}`);
}
for (const node of knowledge.nodes) {
  for (const id of node.people || []) requireRef(personIds, id, `知识点 ${node.id} people`);
  for (const id of node.exercises || []) requireRef(exerciseIds, id, `知识点 ${node.id} exercises`);
  if (node.formalization) requireRef(formalIds, node.formalization, `知识点 ${node.id} formalization`);
}
for (const person of people) for (const id of person.nodes || []) requireRef(nodeIds, id, `人物 ${person.id} nodes`);
for (const exercise of exercises) {
  for (const id of exercise.knowledge || []) requireRef(nodeIds, id, `习题 ${exercise.id} knowledge`);
  for (const id of exercise.people || []) requireRef(personIds, id, `习题 ${exercise.id} people`);
  if (exercise.formalization) requireRef(formalIds, exercise.formalization, `习题 ${exercise.id} formalization`);
}
for (const item of formalization) requireRef(nodeIds, item.knowledge, `形式化 ${item.id} knowledge`);
for (const event of timeline) {
  requireRef(personIds, event.person, `时间线 ${event.title} person`);
  requireRef(nodeIds, event.knowledge, `时间线 ${event.title} knowledge`);
}
if (errors.length) { console.error(errors.map((error) => `- ${error}`).join('\n')); process.exit(1); }
console.log(`数据校验通过：${nodeIds.size} 个知识点，${personIds.size} 位人物，${exerciseIds.size} 道习题，${formalIds.size} 个形式化映射，${timeline.length} 个时间线节点。`);
