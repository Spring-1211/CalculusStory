import Mathlib

example (f : ℝ → ℝ) (a : ℝ) :
    ContinuousAt f a ↔ Tendsto f (𝓝 a) (𝓝 (f a)) := Iff.rfl

example : Continuous (fun x : ℝ => x ^ 2) := by
  fun_prop
