# 🚀 AI English Tutor 로컬 개발 환경 설정 가이드

안녕하세요! 이 가이드는 AI English Tutor 앱을 여러분의 컴퓨터에서 직접 개발하고 실행할 수 있도록 도와주는 친절한 안내서입니다.

현재 이 프로젝트는 웹에서 바로 실행될 수 있도록 간단하게 구성되어 있지만, 실제 개발을 할 때는 **Vite**라는 최신 개발 도구를 사용하는 것이 훨씬 효율적입니다. 이 가이드를 따라오시면, 여러분의 프로젝트를 전문가 수준의 개발 환경으로 업그레이드할 수 있습니다.

### ✨ Vite를 사용하면 무엇이 좋아지나요?

-   **⚡️ 빛처럼 빠른 속도**: 코드를 수정하면 눈 깜짝할 사이에 브라우저 화면에 반영됩니다.
-   **⚙️ 간편한 설정**: 복잡한 설정 없이 React와 TypeScript를 바로 사용할 수 있습니다.
-   **🔒 안전한 API 키 관리**: 중요한 API 키를 코드와 분리하여 안전하게 보관할 수 있습니다.
-   **📦 최적화된 결과물**: 개발이 끝난 앱을 웹사이트에 배포하기 좋도록 가볍고 빠르게 만들어줍니다.

---

## 1단계: 프로젝트 준비 및 구조 정리

가장 먼저, 개발을 시작하기 위한 준비물을 챙기고 프로젝트 폴더 구조를 깔끔하게 정리해 보겠습니다.

### ✅ 준비물

1.  **[Node.js](https://nodejs.org/)**: 최신 웹 개발에 필수적인 JavaScript 실행 환경입니다. (LTS 버전을 설치해주세요.)
2.  **VS Code**: 편리한 코드 에디터입니다.
3.  **터미널**: VS Code에 내장된 터미널을 사용하면 편리합니다. (단축키: `Ctrl` + ` `` `)

### 📂 폴더 및 파일 정리하기

개발의 효율을 높이려면 소스 코드와 설정 파일을 분리하는 것이 중요합니다.

1.  VS Code에서 이 프로젝트 폴더를 열어주세요.

2.  `src` 라는 이름의 새 폴더를 만듭니다. 'source'의 약자로, 모든 소스 코드를 이곳에 보관할 것입니다.

3.  아래 파일과 폴더들을 모두 새로 만든 `src` 폴더 안으로 이동시킵니다.
    -   `components/` (폴더)
    -   `services/` (폴더)
    -   `App.tsx`
    -   `index.tsx`
    -   `types.ts`

4.  **(중요!)** 위 파일들을 `src` 폴더로 옮긴 후, **프로젝트 최상위 경로(root)에 남아있는 동일한 이름의 파일과 폴더들은 혼란을 방지하기 위해 모두 삭제해주세요.**

정리가 끝나면 아래와 같은 깔끔한 구조가 됩니다.

```
ai-english-tutor/
├── src/                  <-- 모든 소스 코드는 여기에!
│   ├── components/
│   ├── services/
│   ├── App.tsx
│   ├── index.tsx
│   └── types.ts
├── docs/
│   └── README.md         <-- (지금 보고 계신 파일)
├── index.html            <-- 웹페이지의 뼈대
└── metadata.json
```

---

## 2단계: 개발 환경 구축하기

이제 Vite와 같은 개발 도구들을 설치하고 설정할 차례입니다. (이 단계의 파일들은 이미 프로젝트에 포함되어 있으니, 내용을 확인만 해주세요!)

### 📜 Node.js 프로젝트 시작하기

1.  VS Code에서 터미널을 열고, 아래 명령어로 `package.json` 파일을 생성합니다. 이 파일은 우리 프로젝트의 이름, 버전, 필요한 부품 목록 등이 적힌 '주민등록증'과 같습니다.
    ```bash
    npm init -y
    ```

2.  개발에 필요한 라이브러리(부품)들을 설치합니다.
    ```bash
    # 앱 실행에 꼭 필요한 라이브러리 (React, Gemini API 등)
    npm install react react-dom @google/genai lucide-react

    # 개발할 때만 필요한 도구들 (Vite, TypeScript 등)
    npm install --save-dev vite @vitejs/plugin-react typescript @types/react @types/react-dom
    ```
    > **💡 Tip:** `package.json` 파일의 내용과 일치하는지 확인해보세요. 이미 일치한다면 이 단계는 건너뛰어도 좋습니다.

### 🎨 Tailwind CSS 설정하기

1.  아래 명령어로 Tailwind CSS 관련 도구들을 설치하고 설정 파일을 자동으로 만듭니다.
    ```bash
    npm install --save-dev tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2.  `src` 폴더 안에 `index.css` 라는 이름의 새 파일을 만들고, 아래 코드를 붙여넣습니다.
    ```css
    /* src/index.css */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
      font-family: 'Inter', sans-serif;
      background: #f0f2f5; /* Fallback */
      background: linear-gradient(135deg, #e0e6ff 0%, #f5f7fa 100%);
    }
    ```
---

## 3단계: 기존 코드 수정 및 최종 연결

이제 설정이 끝났으니, 기존 파일들을 Vite 환경에 맞게 수정하고 서로 연결하여 앱이 동작하도록 만들 차례입니다. **실수를 방지하기 위해, 기존 파일을 수정하는 대신 원본은 백업하고 새 파일을 만드는 안전한 방법을 사용하겠습니다.**

### 📄 `index.html` 파일 교체하기

1.  프로젝트 최상위 경로에 있는 기존 `index.html` 파일의 이름을 **`index.html.backup`** 으로 변경하여 백업합니다.
2.  새로운 `index.html` 파일을 만들고 아래 내용을 그대로 붙여넣으세요. 이 버전은 Vite가 모든 것을 처리하도록 깨끗하게 정리된 버전입니다.

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AI English Tutor</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/index.tsx"></script>
      </body>
    </html>
    ```

### 🔗 `src/index.tsx` 파일 교체하기

1.  `src/` 폴더에 있는 `index.tsx` 파일의 이름을 **`index.tsx.backup`** 으로 변경합니다.
2.  새로운 `src/index.tsx` 파일을 만들고 아래 내용을 붙여넣으세요. `import './index.css';` 한 줄이 추가되어 우리가 만든 스타일이 앱에 적용됩니다.

    ```typescript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // ✅ 이 줄이 스타일을 불러옵니다!

    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Could not find root element to mount to");
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    ```

### 🔐 API 키 안전하게 관리하기

**절대로 API 키를 코드 안에 직접 넣으면 안 됩니다!** `.env` 파일을 사용하여 키를 안전하게 관리해봅시다.

1.  프로젝트 최상위 경로에 `.env` 라는 이름의 새 파일을 만듭니다.

2.  `.env` 파일 안에 **`VITE_`** 라는 접두사를 붙여 API 키를 입력합니다. (이 접두사는 Vite의 규칙입니다.)
    ```
    # .env
    VITE_API_KEY=여기에_당신의_GEMINI_API_KEY를_붙여넣으세요
    ```

3.  `src/services/geminiService.ts` 파일을 Vite 환경에 맞게 교체합니다.
    -   기존 `src/services/geminiService.ts` 파일의 이름을 **`geminiService.ts.backup`** 으로 변경하세요.
    -   새로운 `src/services/geminiService.ts` 파일을 만들고 아래 코드를 붙여넣습니다. API 키를 안전한 방식으로 불러오도록 수정되었습니다.

    ```typescript
    import { GoogleGenAI, Type } from "@google/genai";
    import type { AnalysisResponse } from '../types';

    // Vite 환경 변수에서 API 키를 안전하게 가져옵니다.
    const API_KEY = import.meta.env.VITE_API_KEY;

    // API 키가 설정되지 않았으면 에러를 발생시킵니다.
    if (!API_KEY) {
      throw new Error("VITE_API_KEY environment variable not set. Please create a .env file and add the key.");
    }
    // ... (파일의 나머지 부분은 동일합니다)
    ```

4.  **(아주 중요!)** 민감한 정보나 불필요한 파일이 공유되지 않도록, 프로젝트 최상위 경로에 `.gitignore` 파일을 만들고 아래 내용을 추가하세요.
    ```
    # .gitignore
    node_modules
    .env
    dist
    *.backup
    ```
    > 💡 `.backup` 파일을 추가하여 백업 파일들이 실수로 공유되는 것을 막습니다.

---

## 4단계: 개발 서버 실행하기! 🎉

모든 준비가 끝났습니다! 이제 개발 서버를 실행해볼까요?

1.  `package.json` 파일을 열고, `"scripts"` 부분이 아래와 같이 되어있는지 확인합니다.
    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    ```

2.  터미널에서 아래 명령어를 힘차게 입력하세요!
    ```bash
    npm run dev
    ```

3.  터미널에 `http://localhost:5173/` 와 같은 주소가 나타날 겁니다. 이 주소를 복사하여 웹 브라우저에서 열어보세요.

**축하합니다!** 이제 여러분의 컴퓨터에서 AI English Tutor 앱이 실행됩니다. 코드를 수정하면 실시간으로 화면이 바뀌는 마법을 경험해보세요!

---

## 5단계: 마무리 (선택 사항)

`npm run dev` 로 앱이 성공적으로 실행되는 것을 확인했다면, 이제 더 이상 필요 없는 백업 파일들을 삭제하여 프로젝트를 깔끔하게 유지할 수 있습니다.

-   `index.html.backup`
-   `src/index.tsx.backup`
-   `src/services/geminiService.ts.backup`

---
## 부록: Docker로 실행하기 (선택 사항)

Docker를 사용하면 Node.js 등을 직접 설치하지 않고도, 어디서든 동일한 환경에서 앱을 실행할 수 있는 '휴대용 앱 컨테이너'를 만들 수 있습니다.

### ✅ 준비물

1.  **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: Docker를 실행하기 위한 프로그램입니다.

### 🚀 실행 방법

1.  **`.env` 파일 확인**: `3단계`에서 만든 `.env` 파일과 `VITE_API_KEY`가 올바르게 설정되었는지 다시 한번 확인해주세요.

2.  **Docker 컨테이너 실행**: 프로젝트 터미널에서 아래 명령어를 실행합니다.
    ```bash
    docker-compose up --build -d
    ```

3.  **앱 접속**: 웹 브라우저에서 `http://localhost:8080` 주소로 접속하여 앱을 확인하세요.

### 🛑 Docker 컨테이너 중지

앱을 끄고 싶을 때는 터미널에서 아래 명령어를 실행하세요.
```bash
docker-compose down
```