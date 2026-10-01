# Lean4 形式化映射

这里保存“教材陈述 ↔ Lean4 代码”的对应关系。目标是教学可读和可复现，不把尚未编译的草稿伪装成完成证明。

## 状态标签

- `已验证`：在仓库声明的 Lean/mathlib 版本中通过 `lake build`。
- `mathlib 已有`：mathlib 中有相关定理，但本仓库映射代码仍需按版本核对。
- `教学定义`：为了让大一学生看懂而写的简化定义，不等于 mathlib 的底层实现。
- `待补证明`：代码片段保留 `sorry` 或 `#check`，页面必须明确标出。

## 本地运行

```bash
cd formalization
lake update
lake build
```

Lean 版本和 mathlib 版本写在 `lean-toolchain` 与 `lakefile.toml` 中。在线尝试可使用 [Lean 4 Web](https://live.lean-lang.org/)，但需要选择相同的 Lean/mathlib 版本；网页片段中的 `#check` 用于查找当前版本的确切定理名。
