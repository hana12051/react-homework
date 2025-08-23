export default function Checkbox({ name, checked, onChange, label, error }) {
  return (
    <div className="checkbox">
      <input
        id={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(name, e.target.checked)}
      />
      <label htmlFor={name}>{label}</label>
      {error && (
        <span className="error" style={{ marginLeft: 8 }}>
          {error}
        </span>
      )}
    </div>
  )
}
