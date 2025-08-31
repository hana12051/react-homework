export default function SearchForm({
  q,
  gender = [],
  nat = [],
  country = [],
  options,
  onSubmit,
}) {
  const { genders = [], nats = [], countries = [] } = options || {}

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        onSubmit({
          q: fd.get('q') ?? '',
          gender: fd.getAll('gender'), // 배열
          nat: fd.getAll('nat'), // 배열
          country: fd.getAll('country'), // 배열
        })
      }}
      style={{
        display: 'grid',
        gap: '0.75rem',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        marginBlockEnd: '1rem',
      }}
    >
      <input
        name="q"
        defaultValue={q}
        placeholder="이름, 아이디, 이메일 검색"
        aria-label="검색어"
        style={{
          padding: '0.6rem 0.8rem',
          borderRadius: 6,
          border: '1px solid #ddd',
        }}
      />
      <button type="submit" style={{ padding: '0.6rem 1rem', borderRadius: 6 }}>
        검색
      </button>

      {/* === 카테고리 그룹 === */}
      <div style={{ gridColumn: '1 / -1', display: 'grid', gap: '0.75rem' }}>
        <Fieldset title="성별">
          {genders.map((g) => (
            <LabelCheck
              key={g}
              name="gender"
              value={g}
              defaultChecked={gender.includes(g)}
            >
              #{g}
            </LabelCheck>
          ))}
        </Fieldset>

        <Fieldset title="국가 코드 (nat)">
          {nats.map((n) => (
            <LabelCheck
              key={n}
              name="nat"
              value={n}
              defaultChecked={nat.includes(n)}
            >
              #{n}
            </LabelCheck>
          ))}
        </Fieldset>

        <Fieldset title="국가명">
          {countries.map((c) => (
            <LabelCheck
              key={c}
              name="country"
              value={c}
              defaultChecked={country.includes(c)}
            >
              #{c}
            </LabelCheck>
          ))}
        </Fieldset>
      </div>
    </form>
  )
}

function Fieldset({ title, children }) {
  return (
    <fieldset style={{ border: 'none', padding: 0 }}>
      <legend style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>
        {title}
      </legend>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {children}
      </div>
    </fieldset>
  )
}

function LabelCheck({ name, value, defaultChecked, children }) {
  return (
    <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <span>{children}</span>
    </label>
  )
}
