import T_contentMetadata from "../types/T_contentMetadata";
import { GoogleGenAI } from "@google/genai";
import zod, { number } from "zod"

const requiredOutputSchema = zod.object({
  clusters: zod.array(zod.object({
    id: zod.string(),
    name: zod.string(),
    urls: zod.array(zod.string())
  }))
});

type T_requiredOutputSchema = zod.infer<typeof requiredOutputSchema>

export async function getMindMap(contentMetadata: T_contentMetadata[]): Promise<T_requiredOutputSchema | undefined> {
  const AI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  const prompt = "You have to create a JSON format of mindmap, the format of JSON looks like having a key clusters which is an array of objects, each object has 3 keys id, name & urls. I am giving you an array of metadata which means a node at the end of this prompt. Each node metadata has 3 things which explains the content which includes title, description and link/url to that content. You have to understand the context of each node(basically every element of array). Now your task is to pick a cluster name and if that url, title and description actually matches with context of cluster name then add that url in respective cluster urls array of response. One url can belong to more than one clusters. All links/url/element of metadata I have given must be placed in at least one cluster. For each cluster you have to give id like cluster-1, cluster-2 so on. Be correct about cluster name so that you can concise all the urls in at least one of the cluster. Just give back the json format output no other text needed from you. Don't add the response text in backticks or explicitly writing json, just JSON string as output nothing else. return empty string if empty." + "here you go the nodes " + JSON.stringify(contentMetadata) 
  try {
    const response = await AI.models.generateContent({
    model: "gemini-2.5-flash", // implicit caching support enabled by default, min token needed 1024
    contents: prompt,
    config: {
      tools: [
        { urlContext: {} },
        { googleSearch: {} }
      ],
      responseJsonSchema: zod.toJSONSchema(requiredOutputSchema),
      temperature: 0,
      topK: 2,
      topP: 0.1,
      seed: 42
      }
    });
    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (!part || !("text" in part) || part.text == undefined) {
      throw new Error("Invalid Gemini response");
    }
    else {
      const parsed = JSON.parse(
        part.text.replace(/^```json|```$/g, "")
      );
      const result = requiredOutputSchema.safeParse(parsed);
      if(result.success) return result.data;
      else return undefined;
    }
    
  } catch(err) {
    console.log(err)
    return undefined;
  }
}