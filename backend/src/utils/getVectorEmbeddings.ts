import { VoyageAIClient } from 'voyageai';

const client = new VoyageAIClient({apiKey: process.env.VOYAGE_API_KEY});

type VoyageAIResponse = {
  data: {
    embedding: number[];
  }[]
};

export async function getEmbedding(text: string): Promise<number[]> {
    const results = await client.embed({
        input: text,
        model: "voyage-3-large"
    }) as VoyageAIResponse;

    const embedding = results.data[0].embedding;
    
    return embedding;
}
