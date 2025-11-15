import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// HTML 파일의 'root' ID를 가진 요소를 찾습니다.
const rootElement = document.getElementById('root');
if (!rootElement) {
  // 'root' 요소가 없으면 에러를 발생시킵니다.
  throw new Error("Could not find root element to mount to");
}

// React의 루트를 생성합니다.
const root = ReactDOM.createRoot(rootElement);
// App 컴포넌트를 렌더링합니다. StrictMode는 잠재적인 문제를 알아내기 위한 도구입니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
