'use client';

import { useState } from 'react';
import { summarize } from '../api/summarize/route';
import { readStreamableValue } from 'ai/rsc';

export function AutoSummaryCard() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    setSummary('');
    const { output } = await summarize(input);
    for await (const chunk of readStreamableValue(output)) {
      setSummary(prev => prev + chunk);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginTop: '2rem' }}>
      <div>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste text here to summarize..."
        style={{ width: '100%', padding: '0.5rem' }}
      />

      <button onClick={handleSummarize} style={{ marginTop: '0.5rem' }}>
        Summarize
      </button>
      </div>
      {summary && (
        <div style={{ marginTop: '1rem',  padding: '0.75rem', borderRadius: '6px' }} className="bg-orange-platelet">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
}
