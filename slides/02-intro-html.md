---
highlightTheme: 'monokai'
logoImg: 'resources/logo.png'
slideNumber: false
customTheme: 'resources/my-white'
title: '모던웹 플랫폼'
#showNotes: true
marp: true
---

<!-- .slide: data-transition="fade" -->

## 모던웹 스터디

### 2주차 세미나

#### DOM의 이해

<small>(DOM - Document Object Model)</small>

<br/>

#### 김용기

<div style="font-size: 2rem; margin-top: 2rem">
MES팀 생산IT그룹

생산분석 UI 파트

<small>Mar, 19. 2023</small>

</div>

--

## Nest.js 따라하기

---

### 프로젝트 시작하기

`pnpm 선택하기`

```bash
$ npm i -g @nestjs/cli
$ nest new you2audio
$ cd you2audio
$ pnpm install
$ pnpm start:dev
$ nest g co download
```

---

![](images/nestjs-new.png)

--

## 브라우저가 URL을 찾는 과정

```mermaid
sequenceDiagram
participant Browser
participant Local DNS Resolver
participant Root DNS Server
participant TLD DNS Server
participant Route53
participant ISP
participant Web Server

Browser->>Local DNS Resolver: Request for cloudeyes.org
Local DNS Resolver->>Root DNS Server: Request for .org TLD
Root DNS Server->>TLD DNS Server: Respond with .org TLD DNS server
Local DNS Resolver->>TLD DNS Server: Request for cloudeyes.org nameservers
TLD DNS Server->>Route53: Respond with nameservers (Route53)
Local DNS Resolver->>Route53: Request for cloudeyes.org A/AAAA records
Route53->>Local DNS Resolver: Respond with IP (12.34.56.78)
Local DNS Resolver->>Browser: Respond with IP (12.34.56.78)
Browser->>ISP: Connect to 12.34.56.78:443
ISP->>Web Server: Forward port 443 to local web service
Web Server->>Browser: Respond with web content
```

--

## 지난 세미나 리뷰

- JavaScript란?
  - ES6 (Modern JavaScript란?)
- Compile / Transpiling

--

## 오늘 할 이야기

- Youtube 숙제 이야기
- DOM 의 이해
- TypeScript 맛보기
- Full Stack JavaScript 서비스 맛보기
  - Nest.js 소개

--

### 개발자 로드맵

<iframe class="stretch" src="https://roadmap.sh/"></iframe>

<aside class="notes">
- https://github.com/kamranahmedse/developer-roadmap
</aside>
