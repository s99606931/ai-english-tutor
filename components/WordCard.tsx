import React from 'react';
import type { WordDetail } from '../types';
import { Volume2 } from 'lucide-react';

// 컴포넌트의 props 타입을 정의
interface WordCardProps {
  detail: WordDetail; // 단어 상세 정보
}

// 개별 단어의 분석 결과를 보여주는 카드 컴포넌트
const WordCard: React.FC<WordCardProps> = ({ detail }) => {
  // 단어를 음성으로 읽어주는 함수
  const handleSpeak = () => {
    // 브라우저가 Web Speech API를 지원하는지 확인
    if ('speechSynthesis' in window) {
      // 진행중인 다른 발음이 있다면 취소
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(detail.word);
      utterance.lang = 'en-US'; // 언어를 영어(미국)로 설정
      window.speechSynthesis.speak(utterance); // 음성 재생
    } else {
      alert('음성 재생 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    // 카드를 클릭하면 단어를 읽어줌
    <div
      onClick={handleSpeak}
      className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-200/80 cursor-pointer hover:shadow-xl hover:border-indigo-400/80 hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-2">
        {/* 영어 단어 */}
        <h3 className="text-xl font-bold text-indigo-800 break-all">{detail.word}</h3>
        {/* 스피커 아이콘 */}
        <Volume2 className="text-slate-400 group-hover:text-indigo-600 transition-colors flex-shrink-0 ml-2" size={20} />
      </div>
      {/* 한글 발음 표기 */}
      <p className="text-slate-500 text-sm font-medium">{detail.pronunciation}</p>
      {/* 한국어 뜻 */}
      <p className="text-slate-800 mt-2.5 font-semibold text-base">{detail.meaning}</p>
    </div>
  );
};

export default WordCard;
