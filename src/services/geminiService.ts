import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResponse } from '../types';

// Vite 환경 변수에서 API 키를 안전하게 가져옵니다.
const API_KEY = import.meta.env.VITE_API_KEY;

// API 키가 설정되지 않았으면 에러를 발생시킵니다.
if (!API_KEY) {
  throw new Error("VITE_API_KEY environment variable not set. Please create a .env file and add the key.");
}

// Gemini API 클라이언트를 초기화합니다.
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Gemini API에 요청할 때, 응답으로 받을 JSON 데이터의 구조를 정의합니다.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    sentenceExplanation: {
      type: Type.STRING,
      description: "입력된 영어 문장 전체에 대한 자연스러운 한국어 설명입니다. 문법 구조, 뉘앙스, 핵심 키워드를 포함하여 설명해주세요. 중요한 부분은 Markdown 문법을 사용해 '**'로 감싸서 강조(bold) 처리해주세요. 설명은 여러 줄로 나누어 가독성을 높여주세요.",
    },
    sentencePronunciation: {
        type: Type.STRING,
        description: "입력된 영어 문장 전체의 발음을 최대한 가깝게 한글로 표기한 것입니다. 자연스럽게 읽을 수 있도록 표기해주세요.",
    },
    words: {
      type: Type.ARRAY,
      description: "문장을 구성하는 각 단어에 대한 분석 결과입니다.",
      items: {
        type: Type.OBJECT,
        properties: {
          word: {
            type: Type.STRING,
            description: "분석된 영어 단어 원형입니다.",
          },
          meaning: {
            type: Type.STRING,
            description: "해당 영어 단어의 한국어 뜻입니다. 문맥에 맞는 가장 적절한 뜻을 알려주세요.",
          },
          pronunciation: {
            type: Type.STRING,
            description: "해당 영어 단어의 발음을 최대한 가깝게 한글로 표기한 것입니다.",
          },
        },
        required: ["word", "meaning", "pronunciation"],
      },
    },
  },
  required: ["sentenceExplanation", "sentencePronunciation", "words"],
};

/**
 * 주어진 영어 문장을 분석하기 위해 Gemini API를 호출하는 함수
 * @param sentence - 분석할 영어 문장
 * @returns 분석 결과를 담은 Promise 객체
 */
export const analyzeSentence = async (sentence: string): Promise<AnalysisResponse> => {
  try {
    // API에 전달할 프롬프트
    const prompt = `Analyze the following English sentence for a Korean speaker who is learning English. Provide a detailed explanation of the sentence, its pronunciation in Hangul, and for each word, provide its meaning in Korean and its pronunciation written in Hangul. Sentence: "${sentence}"`;

    // Gemini 모델에 콘텐츠 생성을 요청
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // 사용할 모델
      contents: prompt, // 전달할 프롬프트
      config: {
        responseMimeType: "application/json", // 응답 형식을 JSON으로 지정
        responseSchema: responseSchema, // 응답 JSON의 스키마 지정
        temperature: 0.2, // 생성 결과의 무작위성 조절 (낮을수록 결정적)
      },
    });
    
    // API 응답 텍스트를 JSON으로 파싱
    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as AnalysisResponse;

    // 응답 데이터의 유효성 검사
    if (!parsedResponse.sentenceExplanation || !parsedResponse.words || !parsedResponse.sentencePronunciation) {
      throw new Error("Invalid response format from API.");
    }

    return parsedResponse;
  } catch (error) {
    // 에러 로깅 및 새로운 에러 발생
    console.error("Error analyzing sentence:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};