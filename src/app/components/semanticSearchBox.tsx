'use client';

import { useState } from 'react';
import { semanticSearch } from '../api/search/route';
import { readStreamableValue } from 'ai/rsc';

export function SemanticSearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');

  const handleSearch = async () => {
    setResults('');
    const { output } = await semanticSearch(query);
    for await (const chunk of readStreamableValue(output)) {
      setResults(prev => prev + chunk);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        style={{ padding: '0.5rem', width: '100%' }}
      />

      <button onClick={handleSearch} style={{ marginTop: '0.5rem' }}>
        Search
      </button>

      {results && (
        <div style={{ marginTop: '1rem', padding: '0.75rem',  borderRadius: '6px' }} className="bg-orange-platelet">
          <strong>Results:</strong> {results}
        </div>
      )}
    </div>
  );
}
