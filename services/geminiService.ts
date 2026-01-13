
import { GoogleGenAI } from "@google/genai";
import { ClassroomInputs } from "../types";

export const generateClassroomTranscript = async (inputs: ClassroomInputs): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const systemInstruction = `
    You are an expert educational researcher and playwright specializing in K-12 classroom dynamics in the United States.
    Your task is to generate an extremely realistic transcript of a typical 30-minute K-12 classroom session.
    
    STRICT FORMAT RULES:
    1. Output MUST be plain text.
    2. DO NOT use speaker labels (e.g., NO "Teacher:", "Student:", "Student 1:").
    3. DO NOT include any reporting, commentary, or stage directions.
    4. NO action descriptions (e.g., NO "(Teacher writes on the board)").
    5. NO sound descriptions (e.g., NO "(Shuffling papers)").
    6. ONLY output the words actually spoken by humans in the room.
    7. Use paragraph breaks to separate different speakers or shifts in the conversation.
    8. The transcript must flow like a continuous stream of natural dialogue.
    
    CONTENT REQUIREMENTS:
    - Target Grade: ${inputs.grade}
    - Subject: ${inputs.subject}
    - Standard: ${inputs.standard}
    - Represent roughly 30 minutes of class time. The output should be extensive and detailed.
    - Must sound like a real US classroom: includes teacher verbal management ("Eyes on me, please"), diverse student responses (correct, partially correct, off-topic), and natural verbal interruptions.
    - The lesson must cover at least 60% (3 out of 5) of the following components through dialogue:
      a) Warm-up/greeting
      b) Direct instruction/introduction/mini-lesson
      c) Guided practice/interactive portion
      d) Independent practice (as reflected in dialogue/verbal check-ins)
      e) Closure/formative assessment
    
    Style Note: The spoken language should reflect the cognitive development stage of ${inputs.grade} students.
  `;

  const prompt = `Generate a realistic 30-minute classroom transcript for a ${inputs.grade} ${inputs.subject} class aligned with the standard: "${inputs.standard}". 
  
  CRITICAL: Strictly exclude any non-spoken text. No speaker labels, no action descriptions, no bracketed sounds. Only the spoken words of the teacher and students.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    if (!response.text) {
      throw new Error("No response from the model.");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
