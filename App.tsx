import React, { useState, useCallback } from 'react';
import { analyzeSentence } from './services/geminiService';
import type { AnalysisResponse } from './types';
import SentenceInputForm from './components/SentenceInputForm';
import AnalysisResult from './components/AnalysisResult';
import { Loader, AlertTriangle } from 'lucide-react';

// 메인 애플리케이션 컴포넌트
const App: React.FC = () => {
  // 상태 변수들
  const [analyzedSentence, setAnalyzedSentence] = useState<string>(''); // 분석된 문장 저장
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null); // API로부터 받은 분석 결과 저장
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 저장

  // '분석하기' 버튼 클릭 시 호출되는 함수
  const handleAnalyze = useCallback(async (text: string) => {
    // 입력값이 비어있는지 확인
    if (!text.trim()) {
      setError('분석할 영어 문장을 입력해주세요.');
      return;
    }
    // 상태 초기화 및 설정
    setAnalyzedSentence(text);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Gemini API를 호출하여 문장 분석
      const result = await analyzeSentence(text);
      setAnalysis(result);
    } catch (err) {
      // 에러 처리
      console.error(err);
      setError('문장 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  }, []);

  // 헤더 컴포넌트
  const Header: React.FC = () => (
    <header className="text-center py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
        AI English Tutor
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        영어 문장을 입력하면 한국어로 자세한 설명과 단어별 발음을 제공해드려요.
      </p>
    </header>
  );

  // 푸터 컴포넌트
  const Footer: React.FC = () => (
    <footer className="text-center py-6 mt-auto">
        <p className="text-sm text-slate-500">Powered by Gemini API</p>
    </footer>
  );

  // App 컴포넌트 렌더링
  return (
    <div className="min-h-screen text-slate-800 flex flex-col">
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <Header />
        <div className="mt-4 max-w-3xl mx-auto">
          {/* 문장 입력 폼 */}
          <SentenceInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />

          {/* 로딩 중일 때 로딩 인디케이터 표시 */}
          {isLoading && (
            <div className="flex justify-center items-center mt-12 text-indigo-600">
              <Loader className="animate-spin mr-3" size={32} />
              <span className="text-lg font-semibold">문장을 분석하고 있습니다...</span>
            </div>
          )}

          {/* 에러 발생 시 에러 메시지 표시 */}
          {error && (
            <div className="mt-8 p-4 bg-red-100/60 border border-red-300/80 text-red-800 rounded-xl flex items-center shadow-sm backdrop-blur-sm">
              <AlertTriangle className="mr-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 분석 결과가 있을 때 결과 컴포넌트 표시 */}
          {analysis && <AnalysisResult data={analysis} sentence={analyzedSentence} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
