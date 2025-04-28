'use client';
import { useState } from 'react';
import { generate } from '../api/explain/route';
import { readStreamableValue } from 'ai/rsc';

export function ExplainLikeIm5({ term }: { term: string }) {
  const [hovered, setHovered] = useState(false);
  const [completion, setCompletion] = useState('');
 

  const handleMouseEnter = async () => {
    setHovered(true);
    setCompletion('');

    const { output } = await generate(term);

    for await (const chunk of readStreamableValue(output)) {
      setCompletion(prev => prev + chunk);
    }
  };

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        style={{
          textDecoration: 'underline',
          cursor: 'help',
          color: hovered ? '#059669' : '#578E7E', // dark green : green
          fontWeight: hovered ? '600' : 'normal',
          transition: 'color 0.2s ease',
        }}
      >
        {term}
      </span>

      {hovered && completion && (
        <div
         className="bg-orange-platelet"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.5rem',
            width: '16rem',
            padding: '0.5rem',
            border: '',
            borderRadius: '0.25rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '0.875rem',
            zIndex: 10,
          }}
        >
          {completion}
        </div>
      )}
    </span>
  );
}
