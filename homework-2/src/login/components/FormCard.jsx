export default function FormCard({ title, children }) {
  return (
    <section className="card">
      {title && <h2 className="card__title">{title}</h2>}
      {children}
    </section>
  )
}
