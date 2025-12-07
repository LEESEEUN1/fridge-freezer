# Git 브랜치 전략 & 워크플로우

## 📋 목차
1. [브랜치 전략](#브랜치-전략)
2. [Merge 전략](#merge-전략)
3. [작업 워크플로우](#작업-워크플로우)
4. [PR 템플릿 사용법](#pr-템플릿-사용법)
5. [Git 계정 설정](#git-계정-설정)
6. [주의사항](#주의사항)

---

## 🌳 브랜치 전략

### 메인 브랜치

| 브랜치 | 용도 | 보호 정책 |
|--------|------|-----------|
| `master` | 상용(운영) 환경 배포 브랜치 | ✅ Protected |
| `develop` | 개발 환경 통합 브랜치 | ✅ Protected |

### 작업 브랜치

| 브랜치 패턴 | 용도 | 예시 |
|------------|------|------|
| `feat/*` | 새로운 기능 개발 | `feat/user-login` |
| `fix/*` | 버그 수정 | `fix/login-error` |
| `refactor/*` | 코드 리팩토링 | `refactor/cleanup-api` |

**명명 규칙:**
- 영어 소문자 사용
- 단어는 하이픈(`-`)으로 구분
- 명확하고 간결하게 작성

**예시:**
```
✅ feat/add-search-filter
✅ fix/null-pointer-exception
✅ refactor/simplify-auth-logic

❌ feat/feature1
❌ FEAT/AddButton
❌ feat/이슈123수정
```

---

## 🔀 Merge 전략

### 1. 작업 브랜치 → develop: **Squash Merge**

**목적:** develop 히스토리를 깔끔하게 유지

```
feat/user-login (5개 커밋)
  - WIP: add login form
  - fix typo
  - update styles
  - add validation
  - final touches

    ⬇️ Squash Merge

develop (1개 커밋)
  - feat: Add user login functionality (#12)
```

**장점:**
- develop 브랜치의 히스토리가 깔끔함
- 의미 있는 단위의 커밋만 남음
- 불필요한 "WIP", "fix typo" 같은 커밋 제거

**GitHub에서 설정:**
1. PR 화면에서 `Merge pull request` 드롭다운 클릭
2. `Squash and merge` 선택
3. 커밋 메시지 정리 후 병합

### 2. develop → master: **Merge Commit**

**목적:** 배포 이력 추적 가능

```
develop → master PR 병합
  ⬇️ Merge Commit 생성
master에 "Merge pull request #15 from develop" 커밋 추가
```

**장점:**
- 언제 어떤 기능들이 배포되었는지 명확히 추적
- develop 브랜치의 전체 변경사항 유지
- 롤백이 필요할 때 merge commit만 되돌리면 됨

**GitHub에서 설정:**
1. PR 화면에서 `Merge pull request` 드롭다운 클릭
2. `Create a merge commit` 선택
3. 병합

---

## 💻 작업 워크플로우

### Step 1: 작업 브랜치 생성

```bash
# develop 브랜치로 이동
git checkout develop

# 최신 상태로 업데이트
git pull origin develop

# 새로운 작업 브랜치 생성
git checkout -b feat/user-profile
```

### Step 2: 작업 및 커밋

```bash
# 파일 수정 후
git add .
git commit -m "feat: Add user profile page"

# 추가 작업
git commit -m "style: Update profile layout"
git commit -m "fix: Fix avatar upload bug"
```

**커밋 메시지 컨벤션:**
- `feat:` 새로운 기능
- `fix:` 버그 수정
- `refactor:` 코드 리팩토링
- `style:` 코드 스타일 변경 (로직 변경 없음)
- `docs:` 문서 수정
- `test:` 테스트 코드
- `chore:` 빌드, 설정 파일 수정

### Step 3: 원격 저장소에 Push

```bash
# 처음 push할 때
git push -u origin feat/user-profile

# 이후 push
git push
```

### Step 4: Pull Request 생성

1. GitHub에서 `Compare & pull request` 버튼 클릭
2. **Base 브랜치:** `develop`
3. **Compare 브랜치:** `feat/user-profile`
4. PR 템플릿에 따라 내용 작성
5. `Create pull request` 클릭

### Step 5: 코드 리뷰 & 병합

1. 리뷰어가 코드 리뷰 진행
2. 피드백 반영 (필요시)
3. 승인 후 **Squash and merge** 실행
4. 작업 브랜치 자동 삭제 ✅

### Step 6: 로컬 브랜치 정리

```bash
# develop으로 이동
git checkout develop

# 최신 상태 동기화
git pull origin develop

# 병합된 브랜치 삭제
git branch -d feat/user-profile
```

---

## 📝 PR 템플릿 사용법

### PR 생성 시 자동으로 템플릿 적용됨

템플릿 위치: `.github/pull_request_template.md`

### 작성 가이드

#### 1. 📝 작업 내용
```markdown
이번 PR에서 구현한 기능이나 수정한 내용을 간단히 설명합니다.

예시:
- 사용자 프로필 페이지 구현
- 프로필 이미지 업로드 기능 추가
- 닉네임 변경 기능 추가
```

#### 2. 🏗️ 개발 설계
```markdown
기술적 의사결정이나 구조 변경사항을 설명합니다.

예시:
### 구조 변경사항
- /components/Profile 폴더 생성
- ProfileCard, ProfileForm 컴포넌트 분리

### API/인터페이스 변경
- POST /api/profile/upload (새 엔드포인트)
- UserProfile 타입에 avatarUrl 필드 추가
```

#### 3. 🔗 관련 이슈
```markdown
이슈 관리 시스템의 링크를 추가합니다.

예시:
- https://github.com/organization/issues/repo/issues/123
```

#### 4. 🧪 테스트
```markdown
- [x] 로컬 환경에서 정상 동작 확인
- [x] 빌드 에러 없음
- [x] 주요 기능 테스트 완료
```

#### 5. 📸 스크린샷 (선택)
```markdown
UI 변경사항이 있다면 Before/After 스크린샷 첨부
```

#### 6. ✅ 체크리스트
```markdown
- [x] 커밋 메시지가 명확함
- [x] 불필요한 코드/주석 제거
- [x] 충돌(Conflict) 해결 완료
```

---

## 🔐 Git 계정 설정

### 전역 설정 (회사 계정)
```bash
git config --global user.name "회사이름"
git config --global user.email "회사이메일@company.com"
```

### 프로젝트별 설정 (개인 프로젝트)
```bash
# 프로젝트 폴더로 이동
cd /path/to/project

# 개인 계정 설정
git config user.name "개인이름"
git config user.email "개인이메일@gmail.com"

# 확인
git config user.name
git config user.email
```

**우선순위:** 프로젝트별 설정 > 전역 설정

---

## ⚠️ 주의사항

### 1. Protected Branches

`master`와 `develop` 브랜치는 보호되어 있습니다.

**금지사항:**
- ❌ 직접 push 불가
- ❌ Force push 불가
- ❌ 브랜치 삭제 불가

**가능:**
- ✅ Pull Request를 통한 병합만 가능

### 2. develop → master 병합 후 동기화 필수

```bash
# master 병합이 완료되면 develop도 업데이트
git checkout develop
git merge master
git push origin develop
```

**이유:** develop이 master보다 뒤처지지 않도록 동기화

### 3. 작업 브랜치 생명주기

```
생성 → 작업 → PR → 병합 → 자동 삭제 ✅
```

- feat/, fix/, refactor/ 브랜치는 병합 후 자동 삭제됨
- develop, master는 삭제되지 않음 (보호됨)

### 4. Conflict 발생 시

```bash
# develop의 최신 변경사항 가져오기
git checkout feat/my-feature
git merge develop

# 충돌 해결 후
git add .
git commit -m "Resolve merge conflicts"
git push
```

### 5. 커밋 메시지 작성 팁

**좋은 예:**
```
✅ feat: Add user authentication
✅ fix: Resolve login timeout issue
✅ refactor: Simplify API call logic
```

**나쁜 예:**
```
❌ update
❌ fix bug
❌ WIP
❌ 수정함
```

---

## 🔄 전체 플로우 요약

```
1. feat/login 브랜치 생성 (from develop)
   ↓
2. 작업 & 커밋
   ↓
3. Push to origin
   ↓
4. PR 생성 (feat/login → develop)
   ↓
5. 코드 리뷰
   ↓
6. Squash and merge ✅
   ↓ (feat/login 브랜치 자동 삭제)
7. develop 브랜치에 통합됨
   ↓
8. 배포 준비 완료 시
   ↓
9. PR 생성 (develop → master)
   ↓
10. Create a merge commit ✅
    ↓
11. master 배포
    ↓
12. develop을 master로 동기화
```

---

## 📚 참고 자료

- [GitHub PR 생성 가이드](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Git Commit Convention](https://www.conventionalcommits.org/)
- [Git Flow 전략](https://nvie.com/posts/a-successful-git-branching-model/)

---

## ❓ FAQ

### Q1. develop에서 작업해도 되나요?
**A:** ❌ 안 됩니다. 반드시 작업 브랜치(feat/, fix/, refactor/)를 생성해서 작업하세요.

### Q2. master에서 직접 hotfix를 해야 한다면?
**A:** `hotfix/` 브랜치를 생성하고, master와 develop 모두에 병합합니다.

```bash
git checkout -b hotfix/critical-bug master
# 수정 후
# 1. master로 PR
# 2. develop로도 PR
```

### Q3. Squash merge 후 커밋 메시지는 어떻게 작성하나요?
**A:** PR 제목과 동일하게, 또는 의미 있는 한 줄 요약으로 작성합니다.
```
feat: Add user profile management (#42)
```

### Q4. develop과 master가 계속 분기되어 보이는데 정상인가요?
**A:** ✅ 정상입니다. 두 브랜치는 역할이 다르므로 항상 분기되어 있습니다.

---

**최종 수정일:** 2025-11-02  
**담당자:** leeseeun

