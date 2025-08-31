import { useEffect, useMemo, useState } from 'react'
import SearchForm from './SearchForm.jsx'
import SearchedList from './SearchedList.jsx'

// URL ↔ 상태 동기화 (q / gender / nat / country)
function useQuerySync(defaults = { q: '', gender: [], nat: [], country: [] }) {
  const read = () => {
    const params = new URLSearchParams(location.search)
    const list = (key) =>
      (params.get(key) ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

    return {
      q: params.get('q') ?? defaults.q,
      gender: list('gender'),
      nat: list('nat'),
      country: list('country'),
    }
  }

  const [state, setState] = useState(read)

  useEffect(() => {
    const onPop = () => setState(read())
    addEventListener('popstate', onPop)
    return () => removeEventListener('popstate', onPop)
  }, [])

  const update = (next) => {
    const current = { ...state, ...next }
    const p = new URLSearchParams()
    if (current.q) p.set('q', current.q)
    if (current.gender.length) p.set('gender', current.gender.join(','))
    if (current.nat.length) p.set('nat', current.nat.join(','))
    if (current.country.length) p.set('country', current.country.join(','))
    const url = p.toString() ? `?${p.toString()}` : location.pathname
    history.pushState(null, '', url)
    setState(current)
  }

  return [state, update]
}

// API → UI 스키마 매핑
function mapUser(u) {
  return {
    id: u.login?.uuid,
    name: `${u.name?.first ?? ''} ${u.name?.last ?? ''}`.trim(),
    username: u.login?.username ?? '',
    email: u.email ?? '',
    avatar: u.picture?.medium ?? u.picture?.thumbnail ?? '',
    gender: u.gender ?? '',
    nat: u.nat ?? '',
    country: u.location?.country ?? '',
    // 표시용 태그(렌더링만 사용)
    tags: [u.nat, u.gender, u.location?.country].filter(Boolean),
  }
}

function filterUsers(users, { q, gender, nat, country }) {
  const term = q.trim().toLowerCase()
  return users.filter((u) => {
    const hit =
      !term ||
      [u.name, u.username, u.email, u.country, u.nat, u.gender]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))

    const genderOk = !gender.length || gender.includes(u.gender)
    const natOk = !nat.length || nat.includes(u.nat)
    const countryOk = !country.length || country.includes(u.country)

    return hit && genderOk && natOk && countryOk
  })
}

export default function SearchCardList() {
  const [query, setQuery] = useQuerySync()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Random User API
  useEffect(() => {
    const ctrl = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const url =
          'https://randomuser.me/api/?' +
          new URLSearchParams({
            results: '36',
            seed: 'search-list',
            inc: 'name,login,email,picture,location,nat,gender',
          }).toString()
        const res = await fetch(url, { signal: ctrl.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setUsers((json.results || []).map(mapUser))
      } catch (e) {
        if (e.name !== 'AbortError') setError(e)
      } finally {
        setLoading(false)
      }
    })()
    return () => ctrl.abort()
  }, [])

  // 카테고리 옵션 생성
  const allGenders = useMemo(
    () => [...new Set(users.map((u) => u.gender).filter(Boolean))],
    [users]
  )
  const allNats = useMemo(
    () => [...new Set(users.map((u) => u.nat).filter(Boolean))].sort(),
    [users]
  )
  const allCountries = useMemo(
    () => [...new Set(users.map((u) => u.country).filter(Boolean))].sort(),
    [users]
  )

  const list = useMemo(() => filterUsers(users, query), [users, query])

  if (loading) return <p role="status">불러오는 중…</p>
  if (error) return <p role="alert">에러: {String(error.message || error)}</p>

  return (
    <section>
      <SearchForm
        q={query.q}
        gender={query.gender}
        nat={query.nat}
        country={query.country}
        options={{
          genders: allGenders,
          nats: allNats,
          countries: allCountries,
        }}
        onSubmit={setQuery}
      />
      <SearchedList users={list} />
    </section>
  )
}
