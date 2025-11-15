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

### Docker 설정 파일 상세

Docker 실행에 필요한 파일들의 내용과 역할은 다음과 같습니다.

#### 1. `docker-compose.yml`
-   **역할**: Docker 컨테이너의 구성과 실행 방법을 정의합니다. `Dockerfile`을 사용하여 이미지를 빌드하고, 포트 번호를 매핑하며, 빌드 시점에 `.env` 파일의 API 키를 전달하는 역할을 합니다.
-   **위치**: 프로젝트 최상위 경로

```yaml
# docker-compose.yml
version: '3.8'

services:
  ai-english-tutor:
    # 현재 디렉토리의 Dockerfile을 사용하여 Docker 이미지를 빌드합니다.
    build:
      context: .
      # 호스트의 .env 파일에 있는 VITE_API_KEY를 Dockerfile에 빌드 인자(argument)로 전달합니다.
      args:
        - VITE_API_KEY=${VITE_API_KEY}
    container_name: ai_english_tutor_app
    # 호스트 머신의 8080 포트를 컨테이너의 80 포트로 매핑합니다.
    ports:
      - "8080:80"
    # 사용자 정의 Nginx 설정을 마운트합니다. 이렇게 하면 이미지를 다시 빌드하지 않고도 설정을 변경할 수 있습니다.
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    # 컨테이너가 어떤 이유로든 중지될 경우 자동으로 다시 시작합니다.
    restart: unless-stopped
```

#### 2. `Dockerfile`
-   **역할**: 애플리케이션의 Docker 이미지를 만들기 위한 레시피입니다. 2단계(multi-stage) 빌드 방식을 사용하여 최종 이미지 크기를 최적화합니다.
    -   **1단계 (builder)**: Node.js 환경에서 소스 코드를 빌드하여 정적 파일(`dist` 폴더)을 생성합니다.
    -   **2단계 (final)**: 가벼운 Nginx 웹 서버 환경에 빌드된 정적 파일만 복사하여 최종 이미지를 만듭니다.
-   **위치**: 프로젝트 최상위 경로

```dockerfile
# Dockerfile
# 1단계: React 애플리케이션 빌드
FROM node:20-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 애플리케이션 소스 코드 복사
COPY . .

# API 키를 위한 빌드 시점 인자 설정
ARG VITE_API_KEY
ENV VITE_API_KEY=${VITE_API_KEY}

# 프로덕션용으로 애플리케이션 빌드
RUN npm run build

# 2단계: Nginx로 애플리케이션 제공
FROM nginx:stable-alpine

# builder 단계에서 생성된 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 사용자 정의 Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
```

#### 3. `nginx/nginx.conf`
-   **역할**: Nginx 웹 서버의 설정 파일입니다. React와 같은 Single Page Application(SPA)은 클라이언트 사이드에서 라우팅을 처리하므로, 서버에 존재하지 않는 경로로 요청이 들어왔을 때 `index.html`을 반환하도록 설정(`try_files`)해야 합니다. 이 파일이 그 역할을 담당합니다.
-   **위치**: `nginx/nginx.conf`

```nginx
# nginx/nginx.conf
server {
  listen 80;
  server_name localhost;

  # 정적 파일의 루트 디렉토리
  root /usr/share/nginx/html;
  index index.html;

  # 정적 파일 직접 제공
  location / {
    # 요청된 파일을 먼저 찾고, 없으면 디렉토리를 찾고, 
    # 그래도 없으면 클라이언트 사이드 라우팅을 위해 index.html로 요청을 전달합니다.
    try_files $uri $uri/ /index.html;
  }

  # 캐싱 문제를 방지하기 위한 헤더 추가 (CSS, JS 파일)
  location ~* \.(?:css|js)$ {
    try_files $uri /index.html;
    expires 1y;
    add_header Cache-Control "public";
  }

  # 기타 정적 에셋 처리 (이미지 등)
  location ~* \.(?:ico|gif|jpe?g|png|svg|webp)$ {
    try_files $uri /index.html;
    expires 1y;
    add_header Cache-Control "public";
  }
}
```

#### 4. `.dockerignore`
-   **역할**: Docker 이미지를 빌드할 때 포함하지 않을 파일이나 폴더를 지정합니다. `node_modules`나 `.env` 파일처럼 빌드에 불필요하거나 민감한 정보가 이미지에 포함되지 않도록 하여, 빌드 속도를 높이고 보안을 강화합니다.
-   **위치**: 프로젝트 최상위 경로

```
# .dockerignore
# 의존성
node_modules

# 빌드 결과물
dist
build

# 환경 변수
.env
.env.*

# Git
.git
.gitignore

# IDE 관련
.vscode
.idea

# 로그
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```
