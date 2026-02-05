
import { GoogleGenAI, Type } from "@google/genai";
import { UnifiedAnalysis, AnalysisSource } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      sentiment: { type: Type.STRING, description: "Positive, Negative, or Neutral" },
      confidence_score: { type: Type.NUMBER },
      primary_language: { type: Type.STRING },
      code_switched: { type: Type.BOOLEAN },
      key_emotive_phrases: { type: Type.ARRAY, items: { type: Type.STRING } },
      business_insight: { type: Type.STRING },
      explanation: { type: Type.STRING }
    },
    required: ["sentiment", "confidence_score", "primary_language", "code_switched", "key_emotive_phrases", "business_insight", "explanation"]
  }
};

export async function analyzeText(texts: string[], source: AnalysisSource = 'Manual'): Promise<UnifiedAnalysis[]> {
  const prompt = `Analyze the sentiment of the following South African social media/review signals. 
  Understand local slang (Sharp sharp, Local is lekker, Aweh, Ayoba, Eish, Kwakubheda) and code-switching.
  
  Signals:
  ${texts.join('\n---\n')}
  
  For each signal, identify the sentiment driver words and explain the reasoning. 
  Also provide dummy metrics for reach and mentions based on the text intensity.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const parsedResults = JSON.parse(response.text);

    return parsedResults.map((res: any, idx: number) => ({
      ...res,
      id: Math.random().toString(36).substr(2, 9),
      text: texts[idx],
      source,
      timestamp: Date.now(),
      metrics: {
        reach: Math.floor(Math.random() * 5000) + 100,
        mentions: Math.floor(Math.random() * 50) + 1,
        age_groups: [
          { label: '18-24', value: Math.floor(Math.random() * 40) + 10 },
          { label: '25-34', value: Math.floor(Math.random() * 40) + 20 },
          { label: '35+', value: Math.floor(Math.random() * 20) + 5 }
        ]
      }
    }));
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}

export async function fetchSocialPulse(keyword: string, platforms: AnalysisSource[]): Promise<UnifiedAnalysis[]> {
  // Simulated fetch + real Gemini analysis
  const mockSocialData = platforms.map(p => {
    return `${keyword} is trending in Mzansi. People are saying it's ${Math.random() > 0.5 ? 'ayoba' : 'eish'}!`;
  });
  
  return analyzeText(mockSocialData, platforms[0]);
}
