/-! 教学版的函数与逆函数定义。 -/

universe u v

def IsFunction {α : Type u} {β : Type v}
    (A : Set α) (B : Set β) (R : α → β → Prop) : Prop :=
  ∀ x ∈ A, ∃! y, y ∈ B ∧ R x y

def IsInverse {α : Type u} {β : Type v} (f : α → β) (g : β → α) : Prop :=
  (∀ x, g (f x) = x) ∧ (∀ y, f (g y) = y)
