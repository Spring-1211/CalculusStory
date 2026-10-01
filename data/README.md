# 知识库数据

数据文件是站点的轻量内容层。每个实体用稳定 `id` 连接，页面只负责展示，不在 HTML 里复制关系。

- `knowledge.json`：知识点、教材章节、定义、问题、应用与关系边。
- `people.json`：数学家、思想线索、历史背景和关联知识点。
- `exercises.json`：题目、提示、参考答案、知识点和人物标签。
- `formalization.json`：自然语言陈述、Lean 文件、代码片段、状态和 mathlib 参考。

## 添加一个知识点

1. 在 `knowledge.json.nodes` 添加唯一 `id`。
2. 在 `knowledge.json.links` 添加前置、后继或同主题关系。
3. 在人物、题目、形式化数据中只引用这个 `id`，不要复制标题。
4. 添加对应 Markdown 文章和网页页面，至少写出问题、难点和一个反例。
5. 运行 `python3 -m json.tool data/knowledge.json` 检查 JSON。
