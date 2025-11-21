import { GoogleGenAI } from "@google/genai";
import { SERVICES_DATA } from "../constants";

// Initialize Gemini API
// NOTE: In a real production app, these calls might be proxied through a backend to protect the API key,
// but for this client-side demo, we use the env var directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Engineer AI", a helpful, professional, and technical assistant for the MBSC Australia website.
MBSC Australia provides engineering, testing, and inspection services (Civil, Mining, Oil & Gas).

Your role is to answer visitor questions about MBSC's services based on the following data:
${JSON.stringify(SERVICES_DATA.map(s => ({ title: s.title, description: s.fullDescription, features: s.features })))}

Guidelines:
1. Tone: Professional, Corporate, Australian English, Concise.
2. Do not invent services not listed above.
3. If asked about pricing, refer them to the "Contact Us" page for a quote.
4. Emphasize safety, compliance (AS/NZS standards), and precision.
5. Keep answers under 100 words unless detailed technical explanation is requested.
`;

export const generateResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I apologise, I couldn't process that request at the moment. Please contact our engineering team directly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System specific error. Please try again later or contact support.";
  }
};