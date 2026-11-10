# 우리 일정

최대 5명이 각자의 주간 일정을 겹쳐 보고, 모두 비어 있는 시간을 한눈에 찾는 앱이에요.

- **Windows 앱**: 설치 파일(`uri-iljeong-setup.exe`)로 설치해서 써요. 새 버전이 나오면 알아서 업데이트돼요.
- **안드로이드 앱**: 설치 파일(`uri-iljeong.apk`)로 설치해서 써요. 새 버전은 다운로드 페이지에서 다시 받아 설치해요.
- **아이폰·웹 버전**: 다운로드 페이지의 "웹 버전 열기"를 홈 화면에 추가해서 써요.
  (아이폰 설치 파일은 유료 애플 개발자 계정이 있어야 만들 수 있어요.)

## 폴더 구성

| 경로 | 하는 일 |
|---|---|
| `app/` | 앱 화면 전체 (Windows 앱과 웹 버전이 같이 써요) |
| `main.js` | Windows 앱 창 띄우기, 자동 업데이트 |
| `android/` | 안드로이드 앱 프로젝트 (Capacitor). 화면은 `app/`을 그대로 써요 |
| `capacitor.config.json` | 안드로이드 앱 이름·설정 |
| `build/` | 앱 아이콘 |
| `site/index.html` | 다운로드 페이지 |
| `firestore.rules` | 함께 쓰기 저장소(Firebase) 규칙 |
| `.github/workflows/release.yml` | 태그를 올리면 Windows·안드로이드 설치 파일을 만들어 Releases에 올림 |
| `.github/workflows/pages.yml` | 다운로드 페이지와 웹 버전을 GitHub Pages에 올림 |

## 처음 한 번만 하는 설정

1. GitHub에서 **새 저장소**를 만들어요 (예: `uri-iljeong`, Public).
   - Private 저장소는 친구들이 설치 파일을 내려받을 수 없고, 자동 업데이트도 안 돼요.
2. 이 폴더의 파일을 모두 저장소에 올려요. (`.github` 폴더도 꼭 같이)
   - 웹에서 올릴 때: 저장소 첫 화면의 **uploading an existing file** → 폴더 안 파일을 모두 끌어다 놓기 → **Commit changes**.
     `.github` 폴더가 빠지면 자동 빌드가 안 되니, 올린 뒤 저장소에 `.github/workflows` 가 보이는지 확인해 주세요.
3. 저장소 **Settings → Pages → Source**를 **GitHub Actions**로 바꿔요.
4. 저장소 **Settings → Actions → General → Workflow permissions**가 **Read and write permissions**인지 확인해요.
5. **안드로이드 서명 키**: `E:\OurPlan\android-signing\README-서명키.txt`를 열고, 적힌 대로
   저장소 **Settings → Secrets and variables → Actions → New repository secret**에서 4개를 만들어요.
   - 서명 키 폴더는 절대 저장소에 올리지 말고, 따로 백업해 두세요. 잃어버리면 안드로이드 앱을 업데이트할 수 없어요.

## 새 버전 내보내기

1. 저장소 오른쪽의 **Releases → Draft a new release**를 눌러요. (처음이면 **Create a new release**)
2. **Choose a tag**에 `v1.0.0`처럼 새 번호를 적고 **Create new tag**를 눌러요.
3. **Publish release**를 누르면 몇 분 뒤 `uri-iljeong-setup.exe`(Windows)와 `uri-iljeong.apk`(안드로이드)가 그 릴리스에 붙어요.
   - 진행 상황은 **Actions** 탭에서 볼 수 있어요.
   - 다음 버전은 `v1.0.1`, `v1.1.0`처럼 번호를 올려 주세요. 이미 설치한 사람들 앱이 자동으로 바뀌어요.

## 다운로드 주소

- 다운로드 페이지: `https://아이디.github.io/저장소이름/`
- Windows 설치 파일 바로 받기: `https://github.com/아이디/저장소이름/releases/latest/download/uri-iljeong-setup.exe`
- 안드로이드 설치 파일 바로 받기: `https://github.com/아이디/저장소이름/releases/latest/download/uri-iljeong.apk`

친구들에게는 다운로드 페이지 주소를 보내 주세요.

## 함께 쓰기 (실시간 방)

같은 "방"에 들어온 사람끼리 일정이 실시간으로 맞춰져요. 구글의 무료 저장 서비스 Firebase를 써요.

- 처음 한 번: Firebase 프로젝트를 만들고, `firestore.rules`의 내용을 Firestore 규칙에 붙여 넣고,
  웹 앱 설정값(firebaseConfig)을 `app/index.html`의 `FIREBASE_CONFIG`에 넣어요.
- 쓰는 법: 앱 아래 **함께 쓰기 → 새 방 만들기** → **친구 초대하기**로 방 코드를 보내요.
  친구는 **함께 쓰기 → 방 코드로 들어가기**에 코드를 넣어요.
- 방 코드를 아는 사람은 누구나 그 방의 일정을 보고 고칠 수 있어요. 코드는 아는 사람에게만 보내 주세요.
- 인터넷이 끊기면 그동안은 보기만 할 수 있고, 다시 연결되면 이어서 쓸 수 있어요.

## 친구와 일정 맞추기 (방 없이)

일정은 각 컴퓨터에 저장돼요. 앱 아래 **일정 코드 보내기**로 코드를 복사해 카카오톡으로 보내고,
받은 사람은 **받은 코드 붙여넣기**에 넣으면 일정이 합쳐져요. 같은 사람의 일정은 더 최근에 고친 쪽으로 맞춰져요.
처음에는 한 명이 사람을 모두 추가해서 코드로 나눠 주세요.

## 알아 둘 점

- 코드 서명을 하지 않은 앱이라, 처음 설치할 때 "Windows의 PC 보호" 창이 떠요. **추가 정보 → 실행**을 누르면 돼요.
  이 안내를 없애려면 유료 코드 서명 인증서가 필요해요.
- Windows 앱은 삭제해도 일정이 남아요. 안드로이드 앱은 **삭제하면 일정도 지워지니**, 지우기 전에 "받은 코드 붙여넣기 · 백업"에서 전체 백업을 복사해 두세요. (새 버전을 덮어 설치하는 건 괜찮아요.)
- 안드로이드는 Play 스토어 앱이 아니라서 설치할 때 "출처를 알 수 없는 앱 허용"과 "Play 프로텍트" 안내가 떠요. 다운로드 페이지에 누를 곳을 적어 두었어요.

## 직접 빌드하기 (개발용)

```
npm install
npm start        # 앱 실행
npm run dist     # dist/ 에 설치 파일 만들기 (Windows에서)
npm run android:sync   # app/ 을 고친 뒤 안드로이드 프로젝트에 반영 (Android Studio로 열어 실행)
```
