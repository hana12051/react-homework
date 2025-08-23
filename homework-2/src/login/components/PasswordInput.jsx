import { useState } from 'react'

export default function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  hint,
}) {
  const [show, setShow] = useState(false)

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="input-wrap">
        <input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          className="input input--with-addon"
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(name, e.target.value)}
          aria-invalid={error ? 'true' : 'false'}
        />
        <button
          type="button"
          className="addon-btn"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          aria-label={show ? '비밀번호 숨기기' : '비밀번호 표시'}
        >
          {show ? '숨김' : '표시'}
        </button>
      </div>

      {hint && !error && <p className="help">{hint}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
