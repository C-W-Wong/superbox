export function HoneyField() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute -left-[9999px] h-0 w-0"
    />
  );
}
