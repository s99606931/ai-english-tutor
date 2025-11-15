
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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


export const analyzeSentence = async (sentence: string): Promise<AnalysisResponse> => {
  try {
    const prompt = `Analyze the following English sentence for a Korean speaker who is learning English. Provide a detailed explanation of the sentence, its pronunciation in Hangul, and for each word, provide its meaning in Korean and its pronunciation written in Hangul. Sentence: "${sentence}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as AnalysisResponse;

    if (!parsedResponse.sentenceExplanation || !parsedResponse.words || !parsedResponse.sentencePronunciation) {
      throw new Error("Invalid response format from API.");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error analyzing sentence:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};