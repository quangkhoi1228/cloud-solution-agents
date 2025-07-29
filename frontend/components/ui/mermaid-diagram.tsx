'use client';
import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

// Mermaid Component with error handling
export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      // Clear previous content
      ref.current.innerHTML = '';

      try {
        const id = `mermaid-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        mermaid
          .render(id, chart)
          .then(({ svg }) => {
            if (ref.current) {
              ref.current.innerHTML = svg;
            }
          })
          .catch((error) => {
            console.error('Mermaid render error:', error);
            if (ref.current) {
              ref.current.innerHTML = `
              <div class="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
                <p class="text-red-700 font-medium">Mermaid Diagram Error</p>
                <p class="text-red-600 text-sm mt-1">Unable to render diagram. Please check syntax.</p>
                <pre class="text-xs text-red-500 mt-2 bg-red-100 p-2 rounded overflow-auto">${chart}</pre>
              </div>
            `;
            }
          });
      } catch (error) {
        console.error('Mermaid initialization error:', error);
        if (ref.current) {
          ref.current.innerHTML = `
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
              <p class="text-yellow-700 font-medium">Diagram Loading Error</p>
              <p class="text-yellow-600 text-sm">Please refresh the page to reload diagrams.</p>
            </div>
          `;
        }
      }
    }
  }, [chart]);

  return (
    <div
      ref={ref}
      className='flex justify-center my-6 w-full overflow-x-auto max-w-full'
    />
  );
}
