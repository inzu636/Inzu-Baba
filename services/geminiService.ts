import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real production build, ensure process.env.API_KEY is defined.
// For this demo, if no key is present, we handle it gracefully in the UI.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getLuckyNumberPrediction = async (): Promise<{ number: number; reason: string }> => {
  if (!apiKey) {
    // Fallback if no API key is provided in the environment
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          number: Math.floor(Math.random() * 50) + 1,
          reason: "The stars align mysteriously for this number today (Demo Mode)."
        });
      }, 1500);
    });
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Pick a random lucky number between 1 and 50 for a lottery game. 
    Provide the response in strictly JSON format: { "number": integer, "reason": "short mystical reason string" }.`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text);
    return {
      number: data.number,
      reason: data.reason
    };
  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback on error
    return {
      number: Math.floor(Math.random() * 50) + 1,
      reason: "Fate has chosen this number randomly."
    };
  }
};