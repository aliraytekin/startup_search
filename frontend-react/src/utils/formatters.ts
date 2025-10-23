export function formatValues(state: string) {
  return state
  .split("_")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
}
