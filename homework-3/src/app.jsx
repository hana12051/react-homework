// src/app.jsx
import SearchCardList from './components/SearchCardList/SearchCardList.jsx'

export default function App() {
  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBlockEnd: '1rem' }}>Users Search List</h1>
      <SearchCardList />
    </main>
  )
}
