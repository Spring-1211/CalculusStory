/-!
不依赖 mathlib 的教学核心：把“定义域中的每个输入有唯一输出”写成 Lean 命题。
它用于检查语法和概念对应；分析学定理仍放在 Mathlib 映射中。
-/

def IsFunction {α : Type} {β : Type}
    (A : α → Prop) (B : β → Prop) (R : α → β → Prop) : Prop :=
  ∀ x, A x → ∃ y, B y ∧ R x y ∧ ∀ z, B z ∧ R x z → z = y

def IsInverse {α : Type} {β : Type} (f : α → β) (g : β → α) : Prop :=
  (∀ x, g (f x) = x) ∧ (∀ y, f (g y) = y)

theorem identity_is_inverse (α : Type) :
    IsInverse (fun y : α => y) (fun y : α => y) := by
  constructor <;> intro y <;> rfl
