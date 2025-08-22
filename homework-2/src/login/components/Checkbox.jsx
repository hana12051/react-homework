export default function Checkbox({ name, checked, onChange, label, error }) {
  return (
    <label className="inline-flex select-none items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(name, e.target.checked)}
        className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-200/60"
      />
      <span className="text-sm text-slate-700">{label}</span>
      {error && <span className="ml-2 text-xs text-red-600">{error}</span>}
    </label>
  )
}
