export default function SubmitButton({
  children = '확인',
  className = '',
  ...props
}) {
  return (
    <button
      type="submit"
      {...props}
      className={[
        'inline-flex items-center justify-center',
        'h-12 rounded-full px-5',
        'bg-blue-600 text-white font-semibold shadow-md',
        'hover:bg-blue-700 active:translate-y-[1px]',
        'focus:outline-none focus:ring-4 focus:ring-blue-200',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
