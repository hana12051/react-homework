4주차 과제 회고록 및 계획서

### 1. 목표 범위

1. 필수

- SPA라우팅
- 토스트 알림(성공 | 실패 | 오류)
- 인증(회원가입 | 로그인 | 로그아웃 | 인증 상태 전역관리)

2. 시간이 되면 구현해볼 것

- 프로필 정도 조회, 수정(폼+유효성+토스트)
- 인증 사용자 전용 게시판(목록/작성+유효성+토스트)

---

### 2. 폴더 구조

src/
├─ components/ # UI 컴포넌트
├─ context/ # AuthProvider, useAuth
├─ lib/ # supabase 클라이언트
├─ pages/ # 라우팅 페이지
└─ App.tsx

---

### 2025-09-06 오류

1. supabase is not defined

원인: auth-context.tsx에서 supabase를 사용했지만 import가 빠져 있었음.

해결: src/lib/supabase.ts 파일 생성 후 import.

// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
import.meta.env.VITE_SUPABASE_URL!,
import.meta.env.VITE_SUPABASE_ANON_KEY!
)

2. Unexpected token (2:0) in auth-context.tsx

에러 메시지:

Pre-transform error: Unexpected token (2:0)
| { type: 'SET_AUTH'; user: AuthState['user'] }
| { type: 'SET_UNAUTH' }

원인: 타입 선언 앞에 잘못된 | 파이프 문자가 파일 상단에 단독으로 들어가 있었음.

해결: 불필요한 라인을 삭제하고 타입 별칭으로 선언.

type Action =
| { type: 'SET_LOADING' }
| { type: 'SET_AUTH'; user: User; session: Session | null }
| { type: 'SET_UNAUTH' }

3. HMR Update 후에도 동일 에러 반복

원인: Vite가 수정된 파일을 반영하지 못하고 캐시된 잘못된 구문을 계속 읽음.

해결:

파일 저장 후 잘못된 라인 제거 확인

bun dev / npm run dev 서버 재시작

---

### 2025-09-07 오류

1. AuthContext 문법 에러

원인
auth-context.tsx 파일 맨 위에 case 'SET_LOADING': 같은 switch 문 조각이 잘못 붙어 있었음 → Babel 파서가 “Unexpected token” 에러 발생.

해결
파일 전체를 올바른 구조로 교체하여 switch 블록 내부에 case가 들어가도록 수정.

2. 429 Too Many Requests (회원가입)

원인
동일 이메일로 반복해서 signUp() 요청 → Supabase Auth의 rate limit에 걸림.
또, isSubmitting 제어가 없어 중복 제출이 가능했음.

해결

button disabled={isSubmitting}로 중복 제출 방지.

429 에러 시 1.5s 백오프 후 재시도 로직 추가.

필요 시 다른 이메일로 회원가입.

3. RLS 정책 에러

원인
create policy if not exists 문법 사용 → PostgreSQL에서는 지원하지 않아 syntax error.

해결

drop policy if exists …로 기존 정책 삭제 후 새로 생성.

create policy 문법만 사용.

4. 프로필 조회 406 에러

원인
single()로 조회했는데 profiles 테이블에 해당 id 행이 없어 0행 → Cannot coerce the result to a single JSON object.

해결
single() 대신 maybeSingle() 사용 → 결과 없을 때 null 반환.

5. 프로필 저장 400 에러

원인
profiles.email 컬럼이 NOT NULL인데 upsert 시 email 값을 전달하지 않음 → null value violates not-null constraint.

해결
updateProfile()에서 user.email을 포함해 upsert.

### 회고문

이번주는 Supabase 인증 및 데이터 베이스와 리액트 앱을 연동해 싱글페이지 앱을 구현하는 것이였습니다. 이번 과제는 조금 욕심을 내보아 프로필 정보 조회 및 수정과 인증된 사용자만이 사용할 수 있는 게시판을 둘다 만들어 보고자했습니다.
처음에는 꽤나 잘 진행이되어 "오~ 이거 진행을 다 할 수 있겠는데??" 했지만 역시... 오류르르 디버깅하는 과정에서 꽤나 많은 시간을 잡아먹게 되었습니다.

하나하나 검색과 유트브 강의와 ai, 문서를 찾으며 해결 할 수 있었습니다.
그렇지만 또 바보 같은 실수도 꽤나 많았습니다. 회원가입을 여러번 중복해서 오류가 뜨는 경우도 있었고, 버튼을 두 번씩이나 제출하여 오류가 생기는 경우도 있었습니다.

그래도 하니씩 디버깅을 해나가면서 새로은 것을 알게되고 다양한 방법으로 문제를 해결 할 수 있다는 점을 알게되어 좋은 학습의 시간이었습니다.
