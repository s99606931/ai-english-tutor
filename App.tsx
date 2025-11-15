import React, { useState, useCallback } from 'react';
import { analyzeSentence } from './services/geminiService';
import type { AnalysisResponse } from './types';
import SentenceInputForm from './components/SentenceInputForm';
import AnalysisResult from './components/AnalysisResult';
import { Loader, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [analyzedSentence, setAnalyzedSentence] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError('분석할 영어 문장을 입력해주세요.');
      return;
    }
    setAnalyzedSentence(text);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeSentence(text);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('문장 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  const Footer: React.FC = () => (
    <footer className="text-center py-6 mt-auto">
        <p className="text-sm text-slate-500">Powered by Gemini API</p>
    </footer>
  );

  return (
    <div className="min-h-screen text-slate-800 flex flex-col">
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <Header />
        <div className="mt-4 max-w-3xl mx-auto">
          <SentenceInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />

          {isLoading && (
            <div className="flex justify-center items-center mt-12 text-indigo-600">
              <Loader className="animate-spin mr-3" size={32} />
              <span className="text-lg font-semibold">문장을 분석하고 있습니다...</span>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100/60 border border-red-300/80 text-red-800 rounded-xl flex items-center shadow-sm backdrop-blur-sm">
              <AlertTriangle className="mr-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {analysis && <AnalysisResult data={analysis} sentence={analyzedSentence} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;