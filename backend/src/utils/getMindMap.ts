import T_contentMetadata from "../types/T_contentMetadata";
import { GoogleGenAI } from "@google/genai";
import zod from "zod"

const requiredOutputSchema = zod.object({
  // todo
  // need to think about this as of now leaving will edit this, need a recursive structure as structured output
  root: zod.string()
});

type T_requiredOutputSchema = zod.infer<typeof requiredOutputSchema>

export async function getMindMap(contentMetadata: T_contentMetadata[]): Promise<T_requiredOutputSchema | undefined> {
  const AI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  const prompt = `will think about this ${contentMetadata}`; // passing the whole meta data in prompt for A

  const response = await AI.models.generateContent({
    model: "gemini-2.5-flash", // implicit caching support enabled by default, min token needed 1024
    contents: prompt,
    config: {
      tools: [
        { urlContext: {} },
        { googleSearch: {} }
      ],
      responseMimeType: "application/json",
      responseJsonSchema: zod.toJSONSchema(requiredOutputSchema),
      temperature: 0,
      topK: 2,
      topP: 0.1,
      seed: 42
    }
  });

  const mindmap = requiredOutputSchema.safeParse(JSON.parse(response.text as string));
  if(mindmap.success) return mindmap.data;
  return undefined;
}