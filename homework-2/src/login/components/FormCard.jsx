export default function FormCard({ title, children }) {
  return (
    <section className="relative rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8 pb-16">
      {title && (
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
