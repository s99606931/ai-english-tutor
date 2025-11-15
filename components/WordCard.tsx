import React from 'react';
import type { WordDetail } from '../types';
import { Volume2 } from 'lucide-react';

interface WordCardProps {
  detail: WordDetail;
}

const WordCard: React.FC<WordCardProps> = ({ detail }) => {
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      // 진행중인 다른 발음이 있다면 취소
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(detail.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('음성 재생 기능이 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    <div
      onClick={handleSpeak}
      className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-200/80 cursor-pointer hover:shadow-xl hover:border-indigo-400/80 hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-indigo-800 break-all">{detail.word}</h3>
        <Volume2 className="text-slate-400 group-hover:text-indigo-600 transition-colors flex-shrink-0 ml-2" size={20} />
      </div>
      <p className="text-slate-500 text-sm font-medium">{detail.pronunciation}</p>
      <p className="text-slate-800 mt-2.5 font-semibold text-base">{detail.meaning}</p>
    </div>
  );
};

export default WordCard;