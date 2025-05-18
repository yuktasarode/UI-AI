'use client';

import { useState } from 'react';
import { readStreamableValue } from 'ai/rsc';

export function SemanticSearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [useRAG, setUseRAG] = useState(false);
  const [uploadText, setUploadText] = useState('');

  const handleSearch = async () => {
    setResults('');
  
    const res = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query, useRAG }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (res.ok && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setResults((prev) => prev + decoder.decode(value));
      }
    } else {
      setResults('Error fetching search result.');
    }
  };

  const handleUpload = async () => {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ content: uploadText }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    alert(`Uploaded ${data.count} chunks`);
  };

  const handleDelete = async () => {
  const res = await fetch('/api/delete', {
    method: 'POST',
  });
  if (res.ok) {
    alert('All uploaded data deleted from Chroma.');
  } else {
    alert('Failed to delete data.');
  }
};

const handleGetChunkSize = async () => {
  const res = await fetch('/api/chunksize');
  const data = await res.json();

  if (res.ok) {
    alert(`Total chunks in Chroma: ${data.count}`);
  } else {
    alert('Failed to get chunk size');
  }
};



  return (
    <div style={{ border: '4px solid blue', borderRadius:"4px", padding:"5px" }}>
      <h3>Upload your data (plain text)</h3>
      <textarea
        value={uploadText}
        onChange={(e) => setUploadText(e.target.value)}
        placeholder="Paste your notes, docs, etc..."
        style={{ width: '100%', height: '100px', marginBottom: '0.5rem' }}
      />
      <button onClick={handleUpload} className="myButton-2">
        Upload Data
      </button>

      <button onClick={handleDelete} className="myButton-2" >
        Delete All Uploaded Data
      </button>

      <button onClick={handleGetChunkSize} className="myButton-2" >
        Show Chunk
      </button>

    

      <hr className="myHR"></hr>

   

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        style={{ padding: '0.5rem', width: '100%', border: "5px solid green", borderRadius:"5px" }}
      />

      <div style={{ marginTop: '0.5rem' }}>
        <label>
          <input
            type="checkbox"
            checked={useRAG}
            onChange={(e) => setUseRAG(e.target.checked)}
          />{' '}
          Use RAG (uploaded data)
        </label>
      </div>

      <button onClick={handleSearch} className="myButton">
        Search
      </button>

      

      {results && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '6px' }} className="bg-orange-platelet">
          <strong>Results:</strong>
          <br />
          {results}
        </div>
      )}
    </div>
  );
}
