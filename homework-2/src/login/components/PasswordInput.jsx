import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput(props) {
  const [show, setShow] = useState(false)
  const {
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    autoComplete,
    hint,
  } = props

  return (
    <label className="block">
      {label && (
        <span className="block text-[15px] font-semibold text-slate-900">
          {label}
        </span>
      )}
      <div className="relative">
        <input
          name={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(name, e.target.value)}
          className={[
            'mt-1 w-full bg-transparent pr-10',
            'border-0 border-b border-slate-300',
            'px-0 py-3 text-[15px]',
            'placeholder:text-slate-400',
            'focus:border-indigo-500 focus:ring-0',
            error ? 'border-red-400 focus:border-red-500' : '',
          ].join(' ')}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-1.5 text-slate-500 hover:text-slate-700"
          aria-label={show ? '비밀번호 숨기기' : '비밀번호 표시'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}
