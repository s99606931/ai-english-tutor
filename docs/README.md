# 로컬 개발 환경 설정 가이드

이 문서는 AI English Tutor 애플리케이션을 로컬 컴퓨터에서 개발하기 위한 환경 설정 방법을 안내합니다.

현재 프로젝트는 `importmap`을 사용하여 별도의 빌드 과정 없이 동작하지만, 로컬 개발 환경에서는 **Vite**라는 최신 개발 도구를 사용하여 더 빠르고 편리하게 개발하는 것이 일반적입니다. Vite를 사용하면 다음과 같은 장점이 있습니다.

-   **빠른 개발 서버**: 수정 사항이 즉시 브라우저에 반영됩니다.
-   **쉬운 TypeScript 및 React 설정**: 복잡한 설정 없이 바로 개발을 시작할 수 있습니다.
-   **안전한 API 키 관리**: `.env` 파일을 통해 민감한 정보를 코드와 분리하여 안전하게 관리할 수 있습니다.
-   **프로덕션 빌드**: 최적화된 정적 파일로 프로젝트를 빌드하여 배포할 수 있습니다.

## 사전 준비물

1.  **[Node.js](https://nodejs.org/)**: JavaScript 런타임 환경입니다. (LTS 버전을 설치하는 것을 권장합니다.)
2.  **VS Code**: 코드 에디터입니다.
3.  **터미널**: VS Code에 내장된 터미널이나, 사용하시는 별도의 터미널(Git Bash, iTerm 등)을 준비합니다.

---

## 1단계: 프로젝트 폴더 및 파일 구조 설정

1.  현재 프로젝트 파일들을 로컬 컴퓨터의 원하는 위치에 다운로드하거나 복제합니다. (예: `ai-english-tutor` 폴더)

2.  VS Code에서 이 폴더를 엽니다.

3.  다음과 같은 구조로 폴더와 파일을 정리합니다.
    -   `src` 폴더를 새로 만들고, 기존의 `.tsx` 파일 및 관련 폴더(`components`, `services`)를 모두 이 폴더 안으로 이동시킵니다.
    -   `index.html`과 `metadata.json` 파일은 프로젝트의 최상위 경로(root)에 그대로 둡니다.

    ```
    ai-english-tutor/
    ├── src/
    │   ├── components/
    │   │   ├── AnalysisResult.tsx
    │   │   ├── SentenceInputForm.tsx
    │   │   └── WordCard.tsx
    │   ├── services/
    │   │   └── geminiService.ts
    │   ├── App.tsx
    │   ├── index.tsx
    │   └── types.ts
    ├── docs/
    │   └── README.md  <-- (이 파일)
    ├── index.html
    └── metadata.json
    ```

---

## 2단계: Node.js 프로젝트 초기화 및 의존성 설치

1.  VS Code에서 터미널을 엽니다. (`Ctrl` + ` `` ` 또는 `View > Terminal` 메뉴)

2.  아래 명령어를 실행하여 `package.json` 파일을 생성합니다.

    ```bash
    npm init -y
    ```

3.  Vite와 React 개발에 필요한 패키지들을 설치합니다.

    ```bash
    # 애플리케이션 실행에 필요한 라이브러리 설치
    npm install react react-dom @google/genai lucide-react

    # 개발 환경에서만 필요한 라이브러리 설치
    npm install --save-dev vite @vitejs/plugin-react typescript @types/react @types/react-dom
    ```

---

## 3단계: Tailwind CSS 설정

CDN 방식 대신, 로컬 환경에서는 직접 설치하여 사용하는 것이 효율적입니다.

1.  아래 명령어로 Tailwind CSS 관련 패키지를 설치하고 설정 파일을 생성합니다.

    ```bash
    npm install --save-dev tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2.  생성된 `tailwind.config.js` 파일을 열고 `content` 부분을 다음과 같이 수정하여 Tailwind가 스타일을 적용할 파일을 인식하도록 합니다.

    ```javascript
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // 이 경로를 추가합니다.
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3.  `src` 폴더 안에 `index.css` 파일을 새로 만들고 아래 내용을 붙여넣습니다.

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

## 4단계: Vite 및 TypeScript 설정

1.  프로젝트 최상위 경로에 `vite.config.ts` 파일을 새로 만들고 아래 내용을 붙여넣습니다.

    ```typescript
    // vite.config.ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
    })
    ```

2.  프로젝트 최상위 경로에 `tsconfig.json` 파일을 새로 만들고 아래 내용을 붙여넣습니다.

    ```json
    // tsconfig.json
    {
      "compilerOptions": {
        "target": "ESNext",
        "useDefineForClassFields": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": false,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
      },
      "include": ["src"],
      "references": [{ "path": "./tsconfig.node.json" }]
    }
    ```

3.  프로젝트 최상위 경로에 `tsconfig.node.json` 파일도 새로 만들고 아래 내용을 붙여넣습니다.

    ```json
    // tsconfig.node.json
    {
      "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true
      },
      "include": ["vite.config.ts"]
    }
    ```
---

## 5단계: 코드 수정

1.  **`index.html` 수정하기**
    -   `importmap`과 Tailwind CDN 스크립트, `<style>` 태그를 모두 제거합니다.
    -   마지막 `script` 태그의 `src` 경로를 `/src/index.tsx`로 변경합니다.

    ```html
    <!-- index.html -->
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

2.  **`src/index.tsx` 수정하기**
    -   방금 만든 `index.css` 파일을 import 합니다.

    ```typescript
    // src/index.tsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // 이 줄을 추가하세요!

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

---

## 6단계: API 키 관리

API 키를 코드에 직접 노출하지 않기 위해 환경 변수 파일을 사용합니다.

1.  프로젝트 최상위 경로에 `.env` 파일을 새로 만듭니다.

2.  `.env` 파일 안에 **`VITE_`** 접두사를 붙여 API 키를 입력합니다.

    ```
    # .env
    VITE_API_KEY=여기에_당신의_GEMINI_API_KEY를_붙여넣으세요
    ```

3.  `src/services/geminiService.ts` 파일을 열고 API 키를 가져오는 부분을 수정합니다.

    ```typescript
    // src/services/geminiService.ts
    // const API_KEY = process.env.API_KEY; // 이 줄을 아래와 같이 변경
    const API_KEY = import.meta.env.VITE_API_KEY;
    ```

4.  **(중요)** 프로젝트 최상위 경로에 `.gitignore` 파일을 만들고 아래 내용을 추가하여 민감한 정보가 Git에 올라가지 않도록 합니다.

    ```
    # .gitignore
    node_modules
    .env
    dist
    ```
---

## 7단계: 개발 서버 실행

1.  `package.json` 파일을 열고 `"scripts"` 부분을 다음과 같이 수정합니다.

    ```json
    // package.json
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    ```

2.  이제 터미널에서 아래 명령어를 실행하여 개발 서버를 시작합니다.

    ```bash
    npm run dev
    ```

3.  터미널에 `http://localhost:5173/` 와 같은 주소가 나타나면, 이 주소를 웹 브라우저에서 열어주세요. 이제 로컬 컴퓨터에서 앱이 실행되며, 코드를 수정하면 자동으로 화면에 반영됩니다.

이제 VS Code에서 자유롭게 코드를 수정하고 실시간으로 변경 사항을 확인하며 개발할 수 있습니다.

---

## 8단계 (선택사항): Docker를 사용하여 실행하기

Docker를 사용하면 Node.js나 기타 의존성을 로컬 컴퓨터에 직접 설치하지 않고도 일관된 환경에서 애플리케이션을 실행할 수 있습니다.

### 사전 준비물

1.  **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: Docker와 Docker Compose를 실행하기 위한 애플리케이션입니다.

### 실행 방법

1.  **`.env` 파일 확인**: 프로젝트 최상위 경로에 `6단계`에서 설명한 `.env` 파일이 있고, `VITE_API_KEY`가 올바르게 설정되었는지 확인합니다. Docker Compose는 이 파일을 참조하여 빌드 시 API 키를 컨테이너에 전달합니다.

2.  **Docker 이미지 빌드 및 컨테이너 실행**: 프로젝트 최상위 경로의 터미널에서 아래 명령어를 실행합니다.

    ```bash
    docker-compose up --build -d
    ```
    -   `--build`: Docker 이미지를 새로 빌드합니다. 소스 코드가 변경되면 이 옵션을 사용해 다시 빌드해야 합니다.
    -   `-d`: 컨테이너를 백그라운드에서 실행합니다.

3.  **애플리케이션 접속**: 빌드가 완료되고 컨테이너가 실행되면, 웹 브라우저에서 `http://localhost:8080` 주소로 접속하여 애플리케이션을 확인할 수 있습니다.

### Docker 컨테이너 중지

애플리케이션을 중지하려면 터미널에서 아래 명령어를 실행합니다.

```bash
docker-compose down
```
이 명령어는 `docker-compose.yml` 파일로 생성된 컨테이너와 네트워크를 중지하고 제거합니다.
