import React, { useState } from 'react';

// 컴포넌트의 props 타입을 정의
interface SentenceInputFormProps {
  onAnalyze: (sentence: string) => void; // '분석하기' 버튼 클릭 시 호출될 함수
  isLoading: boolean; // 로딩 상태
}

// 사용자가 영어 문장을 입력하고 제출하는 폼 컴포넌트
const SentenceInputForm: React.FC<SentenceInputFormProps> = ({ onAnalyze, isLoading }) => {
  // textarea의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState<string>('');

  // 폼 제출 시 실행될 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침) 방지
    onAnalyze(inputValue); // 부모 컴포넌트로부터 받은 onAnalyze 함수 호출
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/60 p-6 rounded-2xl shadow-lg border border-slate-200/80 backdrop-blur-sm">
      <label htmlFor="sentence-input" className="block text-lg font-semibold mb-3 text-slate-700">
        영어 문장 입력
      </label>
      <textarea
        id="sentence-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // 입력값이 변경될 때마다 상태 업데이트
        placeholder="예: The quick brown fox jumps over the lazy dog."
        className="w-full h-28 p-4 bg-white/50 border border-slate-300/70 rounded-xl focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all duration-300 resize-none text-base"
        disabled={isLoading} // 로딩 중일 때는 비활성화
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()} // 로딩 중이거나 입력값이 없을 때 비활성화
        className="mt-5 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-lg"
      >
        {isLoading ? '분석 중...' : '설명 보기'}
      </button>
    </form>
  );
};

export default SentenceInputForm;
