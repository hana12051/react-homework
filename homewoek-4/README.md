4주차 과제 회고록 및 계획서

### 1. 목표 범위

1. 필수

- SPA라우팅
- 토스트 알림(성공 | 실패 | 오류)
- 인증(회원가입 | 로그인 | 로그아웃 | 인증 상태 전역관리)

2. 시간이 되면 구현해볼 것

- 프로필 정도 조회, 수정(폼+유효성+토스트)
- 인증 사용자 전용 게시판(목록/작성+유효성+토스트)

### 2. 폴더 구조

src/
├─ components/ # UI 컴포넌트
├─ context/ # AuthProvider, useAuth
├─ lib/ # supabase 클라이언트
├─ pages/ # 라우팅 페이지
└─ App.tsx

2025-09-06 오류

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

<!-- 일단 여기까지만 정리  -->
