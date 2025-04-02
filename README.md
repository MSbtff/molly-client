## **패션을 쉽게 MollyMol**

---

### 🛒 서비스 바로가기

https://mollymol.com/

### **📽️ 시연 영상**

https://drive.google.com/file/d/13Jez_t-zlCY9VO-dskcfzjaCsl4pcMxr/view

### **🔖 프로젝트 개요**

---

- 의류 E-commerce
- Fashionista, anyone can be

### **🎯 목표**

---

- 대용량 트래픽에서 준수한 속도를 유지
- 다수의 트랜잭션에서 동시성 처리 및 일관성 보장

### 팀 구성

---

프론트엔드: 진종환, 최세은

백엔드: 이지은, 김정환, 모창일, 이제윤

### 팀 역할

---

![image.png]([attachment:bff4f771-7580-4581-a944-072fbd3d1fc2:image.png](https://file.notion.so/f/f/998faef7-0f0f-440d-8bfc-e0612091e624/bff4f771-7580-4581-a944-072fbd3d1fc2/image.png?table=block&id=1c9e2be2-c947-80ca-b4e5-fb51aab034d9&spaceId=998faef7-0f0f-440d-8bfc-e0612091e624&expirationTimestamp=1743638400000&signature=TyJC-YHjPPEHuouwcKqLaMVShJG9E_KUcbUnJh9trGI&downloadName=image.png))

### **📚 기술 스택**

---

![스크린샷 2025-04-02 오전 10.06.18.png](attachment:b5b49f46-a62a-4ae8-a0dd-204d188c8f25:스크린샷_2025-04-02_오전_10.06.18.png)

### **🌏 서버 아키텍쳐**

---

![스크린샷 2025-04-02 오전 10.05.36.png](attachment:de69a8b4-4db7-449f-ab30-b1ac5a7d7108:스크린샷_2025-04-02_오전_10.05.36.png)

### 🗺️ ERD

---

![스크린샷 2025-04-02 오전 10.09.02.png](attachment:edb3f577-1e33-4ae2-9dff-6fb2316d84a1:스크린샷_2025-04-02_오전_10.09.02.png)

### 🗺️ 프론트엔드 아키텍처

---

![image.png](attachment:ca121973-9ff9-44c4-9772-c4c3c2b523ab:image.png)

### 🎞️ 와이어프레임

---

![image.png](attachment:9a10af81-89cb-4fbb-bff0-c1b35a3c6ec8:image.png)

### 👬 협업

---

![image.png](attachment:69977ba7-dcce-4b7d-ae38-06e3648488b1:image.png)

### **🔗주요 기능**

---

**1️⃣ 회원가입/ 로그인**

- 이메일을 통해 회원 가입 및 로그인을 할 수 있습니다.
- 마이페이지에서 회원 정보를 관리할 수 있습니다.

**2️⃣ 상품 관리**

- 상품 검색 및 필터링 (필터: 카테고리, 색상, 사이즈, 가격 등/정렬: 최신 순, 조회 많은 순, 구매 많은 순  등)
- 상품 상세 페이지 - 이미지, 설명, 리뷰, 재고, 배송 정보 표시
- 상품 등록 -  상품 단건 등록, 상품 다건 (100건 이상부터 1,000,000건 이하) 엑셀로 등록 가능
- 상품 수정 및 삭제

3️⃣ **장바구니**

- 사용자는 상품을 장바구니에 담을 수 있습니다.
- 장바구니에서 옵션 및 수량 변경할 수 있습니다.
- 장바구니 전체 선택, 전체 삭제 할 수 있습니다.

4️⃣ **결제**

- 토스 API를 통해 사용자는 결제를 진행할 수 있습니다.
- 포인트를 사용하여 결제 할 수 있습니다.

**5️⃣ 주문 및 배송 관리**

- 자신의 기본 배송지 설정 및 추가, 변경, 삭제 할 수 있습니다.
- 마이페이지에서 사용자의 주문 내역을 조회할 수 있습니다.

**6️⃣ 리뷰**

- 사용자는 배송완료된 상품의 리뷰를 작성할 수 있습니다.
- 사용자는 리뷰 작성, 수정, 삭제 할 수 있습니다.
- 리뷰에 대한 좋아요 기능을 제공합니다.
- 최근 7일간 누적 좋아요가 많은 인기순위 Top 12를 조회할 수 있습니다.





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

```js
├── app/ # Next.js app router 폴더
│ ├── layout.tsx
│ └── page.tsx
│
├── pages/ # Next.js pages 폴더 (선택적)
│ └── README.md # 해당 폴더의 목적과 역할에 대한 설명
│
├── src/ # 소스 코드
│ ├── app/ # FSD app 폴더 (앱 초기화, 프로바이더 등)
│ │ ├── providers/
│ │ └── authorization/
│ │
│ ├── pages/ # FSD pages 폴더 (페이지 컴포넌트)
│ │ ├── main/
│ │ │ ├── ui/ # 홈 페이지 전용 하위 컴포넌트들
│ │ │ ├── hooks/ # 홈 페이지 전용 커스텀 훅
│ │ │ │
│ │ ├── mypage/
│ │ ├── buy/
│ │ └── product/
│ │
│ ├── entities/ # 비즈니스 엔티티(e.g 유저)
│ │ ├── user/
│ │ │ ├── model/ # 사용자 상태 관리
│ │ │ ├── api/ # 사용자 관련 API 모듈
│ │ │ ├── types/ # 사용자 관련 타입 정의 (TypeScript)
│ │ │ ├── index.ts # 모듈별로 export 정리
│ │ └── product/
│ │
│ ├── widgets/ # 위젯 컴포넌트 (페이지에서 사용하는 재사용 가능한 구성 요소)
│ │ ├── layout/ # 레이아웃 관련 위젯들
│ │ │ ├── Header/ # 헤더 위젯
│ │ │ │ ├── index.ts # 헤더 Export
│ │ │ │ ├── styles.css # 헤더 스타일
│ │ │ │ ├── Header.tsx # 헤더 컴포넌트
│ │ │ │ └── ...
│ │ │ ├── Footer/ # 푸터 위젯
│ │ └── ...
│ │
│ ├── features/ # 기능 단위
│ │ ├── auth/
│ │ │ ├── api/ # 인증 관련 API 통신 모듈
│ │ │ ├── ui/ # 인증 관련 UI 컴포넌트
│ │ │ ├── model/ # 인증 관련 상태 관리
│ │ │ ├── types/ # 인증 관련 타입 정의 (TypeScript)
│ │ │ ├── utils/ # 인증 관련 유틸리티 함수
│ │ ├── cart/
│ │ └── buy/
│ │
│ ├── shared/ # 공통 유틸리티, 컴포넌트, 훅 등
│ │ ├── utils/ # 유틸리티 함수
│ │ ├── hooks/ # 공통 커스텀 훅
│ │ ├── ui/ # 공통 컴포넌트 (Button, Input 등)
│ │ ├── styles/ # 공통 스타일 파일
│ │ ├── types/ # 공통 타입 정의 (TypeScript)
│ │ ├── index.ts # 모듈별로 export 정리
│ │ └── ...
│ └── ...
└── ...
```


