import React, { useState } from 'react';

interface SentenceInputFormProps {
  onAnalyze: (sentence: string) => void;
  isLoading: boolean;
}

const SentenceInputForm: React.FC<SentenceInputFormProps> = ({ onAnalyze, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/60 p-6 rounded-2xl shadow-lg border border-slate-200/80 backdrop-blur-sm">
      <label htmlFor="sentence-input" className="block text-lg font-semibold mb-3 text-slate-700">
        영어 문장 입력
      </label>
      <textarea
        id="sentence-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="예: The quick brown fox jumps over the lazy dog."
        className="w-full h-28 p-4 bg-white/50 border border-slate-300/70 rounded-xl focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all duration-300 resize-none text-base"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="mt-5 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-lg"
      >
        {isLoading ? '분석 중...' : '설명 보기'}
      </button>
    </form>
  );
};

export default SentenceInputForm;