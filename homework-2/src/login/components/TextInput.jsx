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
    <label className="block">
      {label && (
        <span className="block text-[15px] font-semibold text-slate-900">
          {label}
        </span>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(name, e.target.value)}
        className={[
          'mt-1 w-full bg-transparent',
          'border-0 border-b border-slate-300',
          'px-0 py-3 text-[15px]',
          'placeholder:text-slate-400',
          'focus:border-indigo-500 focus:ring-0',
          error ? 'border-red-400 focus:border-red-500' : '',
        ].join(' ')}
      />
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}
