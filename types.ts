
export interface WordDetail {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface AnalysisResponse {
  sentenceExplanation: string;
  sentencePronunciation: string;
  words: WordDetail[];
}