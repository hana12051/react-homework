export default function SubmitButton({
  children = '확인',
  className = '',
  ...props
}) {
  return (
    <button
      type="submit"
      {...props}
      className={`btn btn--block btn--primary ${className}`}
    >
      {children}
    </button>
  )
}
