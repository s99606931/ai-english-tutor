
import React from 'react';
import type { AnalysisResponse } from '../types';
import WordCard from './WordCard';
import { BookOpenText, Grid3x3, Volume2 } from 'lucide-react';

interface AnalysisResultProps {
  data: AnalysisResponse;
  sentence: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, sentence }) => {
  const handleSpeakSentence = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('음성 재생 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  const renderExplanationWithMarkdown = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-indigo-700">{part}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="mt-10 space-y-10 animate-fade-in">
      <section>
        <h2 className="text-xl font-semibold mb-3 text-slate-600">분석한 문장</h2>
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-slate-200/80">
          <div className="flex justify-center items-center gap-4">
            <p className="text-xl md:text-2xl text-slate-800 font-semibold tracking-wide text-center">
              "{sentence}"
            </p>
            <button
              onClick={handleSpeakSentence}
              className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-indigo-100/50"
              aria-label="문장 듣기"
            >
              <Volume2 size={24} />
            </button>
          </div>
          <p className="text-center text-slate-600 mt-3 text-base md:text-lg bg-slate-100/70 p-2 rounded-lg">
            {data.sentencePronunciation}
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold mb-4 text-slate-800">
          <BookOpenText className="mr-3 text-indigo-600" />
          문장 전체 설명
        </h2>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/80">
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base">
            {renderExplanationWithMarkdown(data.sentenceExplanation)}
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold mb-4 text-slate-800">
          <Grid3x3 className="mr-3 text-indigo-600" />
          단어별 분석
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.words.map((wordDetail, index) => (
            <WordCard key={`${wordDetail.word}-${index}`} detail={wordDetail} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalysisResult;