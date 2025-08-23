export default function TextInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  autoComplete,
  hint,
}) {
  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        className="input"
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={error ? 'true' : 'false'}
      />
      {hint && !error && <p className="help">{hint}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
