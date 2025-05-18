import { ChromaClient } from 'chromadb';
import { v4 as uuidv4 } from 'uuid';

const client = new ChromaClient({ path: 'http://localhost:8000' }); // Explicit path to running Chroma server
const COLLECTION_NAME = 'my_collection';

// Embedding function using Ollama (nomic-embed-text)
const embeddingFn = async (texts: string[]): Promise<number[][]> => {
  const results: number[][] = [];

  for (const text of texts) {
    const res = await fetch('http://localhost:11434/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: text,
      }),
    });

    const data = await res.json();
    if (!data.embedding) {
      throw new Error('Failed to get embedding from Ollama');
    }
    results.push(data.embedding);
  }

  return results;
};

// Get or create the Chroma collection (no embeddingFunction passed — you provide embeddings manually)
export async function getCollection() {
  return client.getOrCreateCollection({
    name: COLLECTION_NAME,
  });
}

// Add chunks to Chroma with pre-computed embeddings
export async function addToChroma(chunks: string[]) {
  const collection = await getCollection();
  const ids = chunks.map(() => uuidv4());
  const embeddings = await embeddingFn(chunks);

  await collection.add({
    ids,
    documents: chunks,
    embeddings,
  });

  return ids.length;
}

export async function deleteAllFromChroma() {
 const collection = await getCollection();
  const all = await collection.get();
  const ids = all.ids || [];

  if (ids.length > 0) {
    await collection.delete({ ids });
    console.log('✅ Deleted all documents');
  } else {
    console.log('🟡 No documents to delete');
  }
}

// Query Chroma using Ollama-generated embedding
export async function queryChroma(query: string, topK = 3): Promise<string[]> {
    try {
  const collection = await getCollection();

  const res = await fetch('http://localhost:11434/api/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'nomic-embed-text',
      prompt: query,
    }),
  });

  const { embedding } = await res.json();
  if (!embedding) {
    throw new Error('Failed to get query embedding from Ollama');
  }

  const results = await collection.query({
    queryEmbeddings: [embedding], // <-- critical change
    nResults: topK,
  });

  return (results.documents[0] || []).filter((doc): doc is string => doc !== null);
}
catch(e){
    console.error('[Chroma Error]', e);
    throw new Error('Enable Chroma: Unable to connect or query vector store.');
}
}
