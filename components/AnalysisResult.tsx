import React from 'react';
import type { AnalysisResponse } from '../types';
import WordCard from './WordCard';
import { BookOpenText, Grid3x3, Volume2 } from 'lucide-react';

// 컴포넌트의 props 타입을 정의
interface AnalysisResultProps {
  data: AnalysisResponse; // API로부터 받은 분석 결과 데이터
  sentence: string; // 사용자가 입력한 원본 문장
}

// 문장 분석 결과를 보여주는 컴포넌트
const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, sentence }) => {
  // 문장 전체를 음성으로 읽어주는 함수
  const handleSpeakSentence = () => {
    // 브라우저가 Web Speech API를 지원하는지 확인
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // 이전에 재생 중이던 음성 취소
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'en-US'; // 언어를 영어(미국)로 설정
      window.speechSynthesis.speak(utterance); // 음성 재생
    } else {
      alert('음성 재생 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  // '**'로 감싸진 텍스트를 굵게 표시하는 함수 (간단한 마크다운 렌더링)
  const renderExplanationWithMarkdown = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      // 인덱스가 홀수인 경우 (즉, '**'와 '**' 사이의 텍스트)
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-indigo-700">{part}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="mt-10 space-y-10 animate-fade-in">
      {/* 분석한 문장 섹션 */}
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
          {/* 문장 전체 발음 */}
          <p className="text-center text-slate-600 mt-3 text-base md:text-lg bg-slate-100/70 p-2 rounded-lg">
            {data.sentencePronunciation}
          </p>
        </div>
      </section>

      {/* 문장 전체 설명 섹션 */}
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

      {/* 단어별 분석 섹션 */}
      <section>
        <h2 className="flex items-center text-2xl font-bold mb-4 text-slate-800">
          <Grid3x3 className="mr-3 text-indigo-600" />
          단어별 분석
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* 각 단어에 대한 WordCard 컴포넌트를 렌더링 */}
          {data.words.map((wordDetail, index) => (
            <WordCard key={`${wordDetail.word}-${index}`} detail={wordDetail} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalysisResult;
