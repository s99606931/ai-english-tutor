// 개별 단어의 상세 정보를 위한 인터페이스
export interface WordDetail {
  word: string; // 영어 단어
  meaning: string; // 한국어 뜻
  pronunciation: string; // 한글 발음 표기
}

// Gemini API로부터 받는 전체 분석 응답 데이터 구조에 대한 인터페이스
export interface AnalysisResponse {
  sentenceExplanation: string; // 문장 전체에 대한 한국어 설명
  sentencePronunciation: string; // 문장 전체에 대한 한글 발음 표기
  words: WordDetail[]; // 문장을 구성하는 각 단어의 상세 정보 배열
}
