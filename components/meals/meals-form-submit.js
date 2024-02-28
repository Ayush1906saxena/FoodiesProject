"use client";
import { useFormStatus } from "react-dom";
export default function MealsFormSubmit() {
  // Usinf destructuring to get the one property we need from userFormStatus
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
