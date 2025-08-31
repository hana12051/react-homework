export default function SearchedList({ users }) {
  if (!users.length) {
    return <p role="status">검색 결과가 없습니다.</p>
  }

  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {users.map((u) => (
        <li
          key={u.id}
          style={{
            border: '1px solid #eee',
            borderRadius: 10,
            padding: '1rem',
          }}
        >
          <article>
            <header
              style={{
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {u.avatar && (
                <img
                  src={u.avatar}
                  alt={`${u.name} profile`}
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                  loading="lazy"
                />
              )}
              <div>
                <strong style={{ fontSize: 16 }}>{u.name}</strong>
                <div style={{ fontSize: 12, opacity: 0.7 }}>@{u.username}</div>
              </div>
            </header>
            <p style={{ fontSize: 13, margin: 0 }}>{u.email}</p>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
              }}
            >
              {(u.tags || []).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: '2px 8px',
                    border: '1px solid #ddd',
                    borderRadius: 999,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
