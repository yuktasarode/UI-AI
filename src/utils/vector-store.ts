export type VectorStoreItem = {
    id: string;
    embedding: number[];
    chunk: string;
  };
  
  export const vectorStore: VectorStoreItem[] = [];