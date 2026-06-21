'use client';
 
import { useEffect } from 'react';
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error])
 
  return (
    <html>
      <body>
        <div style={{ padding: '40px', backgroundColor: '#000', color: '#ff5555', fontFamily: 'monospace', width: '100vw', height: '100vh', zIndex: 999999, position: 'fixed', top: 0, left: 0 }}>
          <h2>Application Crash Caught Locally!</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '20px' }}>{error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '20px', color: '#999', fontSize: '12px' }}>{error.stack}</pre>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}
