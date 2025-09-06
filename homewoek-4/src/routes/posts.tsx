import { Link } from 'react-router-dom'

export default function Posts() {
  return (
    <section className="page" aria-labelledby="posts-heading">
      <h2 id="posts-heading">Posts (보호 예정)</h2>
      <p>
        <Link to="/posts/new">새 글 작성</Link>
      </p>
    </section>
  )
}
