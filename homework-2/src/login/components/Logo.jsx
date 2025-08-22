// src/login/components/Logo.jsx
export default function Logo({ className = '' }) {
  return (
    <div className={`mb-6 flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-soft backdrop-blur-xs ring-1 ring-black/5">
        <span className="size-2 rounded-full bg-indigo-500" />
        <span className="text-lg font-bold tracking-tight text-slate-800">
          Brand
        </span>
      </div>
    </div>
  )
}
