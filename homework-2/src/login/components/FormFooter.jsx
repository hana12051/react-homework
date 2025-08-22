export default function FormFooter({ mode, onSwitch }) {
  return (
    <p className="mt-7 text-center text-sm text-slate-600">
      {mode === 'login' ? (
        <>
          아직 계정이 없나요?{' '}
          <button
            onClick={onSwitch}
            className="font-medium text-slate-900 underline underline-offset-4 hover:opacity-80"
          >
            회원가입
          </button>
        </>
      ) : (
        <>
          이미 계정이 있나요?{' '}
          <button
            onClick={onSwitch}
            className="font-medium text-slate-900 underline underline-offset-4 hover:opacity-80"
          >
            로그인
          </button>
        </>
      )}
    </p>
  )
}
