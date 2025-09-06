import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page" aria-labelledby="nf-heading">
      <h2 id="nf-heading">페이지를 찾을 수 없습니다.</h2>
      <p>
        <Link to="/">홈으로 돌아가기</Link>
      </p>
    </section>
  )
}
