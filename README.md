# SHIFT UP 웹사이트

기업 맞춤형 글로벌 인재육성 교육 플랫폼 SHIFT UP의 정적(static) 웹사이트입니다.
순수 HTML / CSS / JavaScript로 제작되었으며 빌드 과정이 없습니다.

## 구조

```
.
├── index.html              # 홈
├── style.css               # 공통 스타일
├── main.js                 # 공통 스크립트 (헤더 / 모바일 메뉴 / 슬라이더)
├── logo.png                # 로고
├── company/                # 회사소개
├── program/                # 프로그램 (All / Corporate / Role / Global / 1:1 PT)
├── insights/               # 인사이트 (뉴스레터 + 기사)
├── location/               # 위치 (글로벌 사무소)
└── contact/                # 교육 문의
```

## 로컬에서 보기

별도 빌드 없이 정적 서버로 열면 됩니다.

```bash
npx serve .
# 또는 VS Code Live Server 등
```

## 배포

GitHub에 push 하면 Netlify가 자동으로 재배포합니다 (Continuous Deployment).
