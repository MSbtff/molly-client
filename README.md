## Git Convention

```bash
ex: [#123] feat: 멤버 조회 시 닉네임 가져오기 비동기 처리

feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
chore: 그 외 자잘한 작업
test: 테스트 코드
build: 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)
CI: CI관련 설정
style: 코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등)
refactor: 성능 개선
merge: 기능 개발 후 브랜치 병합
docker: 도커 구성
DB: MySQL 데이터베이스 특정 (마이그레이션, 스크립트, 확장 등)
settings: 환경설정
comment : 주석
```

## 폴더 구조

```javascript
├── app/                    # Next.js app router 폴더
│   ├── layout.tsx
│   └── page.tsx
│
├── pages/                  # Next.js pages 폴더 (선택적)
│   └── README.md          # 해당 폴더의 목적과 역할에 대한 설명
│
├── src/                    # 소스 코드
│   ├── app/               # FSD app 폴더 (앱 초기화, 프로바이더 등)
│   │   ├── providers/
│   │   └── authorization/
│   │
│   ├── pages/            # FSD pages 폴더 (페이지 컴포넌트)
│   │   ├── main/
│	│	│   │   ├── ui/               # 홈 페이지 전용 하위 컴포넌트들
│	│	│   │   ├── hooks/            # 홈 페이지 전용 커스텀 훅
│   │   │   │
│   │   ├── mypage
│   │   ├── buy/
│   │   └── product
│   │
│   ├── entities/          # 비즈니스 엔티티(e.g 유저)
│   │   ├── user/
│	│	│   │   ├── model/            # 사용자 상태 관리
│	│	│   │   ├── api/              # 사용자 관련 API 모듈
│	│	│   │   ├── types/            # 사용자 관련 타입 정의 (TypeScript)
│	│	│   │   ├── index.ts          # 모듈별로 export 정리
│   │   └── product/
│   │
│	│	├── widgets/                  # 위젯 컴포넌트 (페이지에서 사용하는 재사용 가능한 구성 요소)
│	│	│   ├── layout/               # 레이아웃 관련 위젯들
│	│	│   │   ├── Header/           # 헤더 위젯
│	│	│   │   │   ├── index.ts      # 헤더 Export
│	│	│   │   │   ├── styles.css    # 헤더 스타일
│	│	│   │   │   ├── Header.tsx    # 헤더 컴포넌트
│	│	│   │   │   └── ...
│	│	│   │   ├── Footer/           # 푸터 위젯
│   │   └── ...
│   │
│   ├── features/          # 기능 단위
│   │   ├── auth/
│	│	│   │   ├── api/              # 인증 관련 API 통신 모듈
│	│	│   │   ├── ui/               # 인증 관련 UI 컴포넌트
│	│	│   │   ├── model/            # 인증 관련 상태 관리
│	│	│   │   ├── types/            # 인증 관련 타입 정의 (TypeScript)
│	│	│   │   ├── utils/            # 인증 관련 유틸리티 함수
│   │   ├── cart/
│   │   └── buy/
│   │
│   │
│   │
├── shared/                   # 공통 유틸리티, 컴포넌트, 훅 등
│   ├── utils/                # 유틸리티 함수
│   ├── hooks/                # 공통 커스텀 훅
│   ├── ui/                   # 공통 컴포넌트 (Button, Input 등)
│   ├── styles/               # 공통 스타일 파일
│   ├── types/                # 공통 타입 정의 (TypeScript)
│   ├── index.ts              # 모듈별로 export 정리
│   └── ...
└── ...
```
