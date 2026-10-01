import Mathlib

open Filter

def HasSeqLimit (a : ℕ → ℝ) (L : ℝ) : Prop :=
  ∀ ε > 0, ∃ N, ∀ n ≥ N, |a n - L| < ε

theorem identity_has_limit (a : ℝ) :
    Tendsto (fun x : ℝ => x) (𝓝 a) (𝓝 a) := by
  exact tendsto_id

theorem identity_has_epsilon_limit (a : ℝ) :
    ∀ ε > 0, ∃ δ > 0, ∀ x : ℝ, |x - a| < δ → |x - a| < ε := by
  intro ε hε
  refine ⟨ε, hε, ?_⟩
  intro x hx
  exact hx
