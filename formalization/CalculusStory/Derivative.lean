import Mathlib

example (x : ℝ) :
    HasDerivAt (fun t : ℝ => t ^ 2) (2 * x) x := by
  convert (hasDerivAt_id x).pow 2 using 1 <;> ring
