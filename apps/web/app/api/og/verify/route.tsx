import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse params
    const score = searchParams.get('score') || '0';
    const name = searchParams.get('name') || 'Contributor';
    const id = searchParams.get('id') || 'unverified';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #18181b 0%, #09090b 100%)',
            color: '#fff',
            fontFamily: 'system-ui',
            padding: '40px',
          }}
        >
          {/* Main Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '60px',
              padding: '60px',
              width: '1000px',
              height: '500px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-150px',
                right: '-150px',
                width: '400px',
                height: '400px',
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                filter: 'blur(80px)',
                borderRadius: 'full',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                <div style={{ padding: '8px 20px', backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '900', color: '#f97316', letterSpacing: '0.2em' }}>
                    VERIFIED CREDENTIAL
                </div>
            </div>

            <h1 style={{ fontSize: '80px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.05em' }}>
                GSoC <span style={{ color: '#f97316', fontStyle: 'italic' }}>Ready</span>
            </h1>
            
            <p style={{ fontSize: '32px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '40px' }}>
                @{name}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <div style={{ fontSize: '100px', fontWeight: '900', color: '#fff' }}>
                    {Math.round(parseFloat(score))}
                </div>
                <div style={{ height: '80px', width: '2px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: '#f97316', letterSpacing: '0.1em' }}>READINESS SCORE</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.4)' }}>Certified Feb 2026</span>
                </div>
            </div>

            {/* Footer */}
            <div style={{ position: 'absolute', bottom: '40px', left: '60px', right: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold', letterSpacing: '0.1em' }}>CREDENTIAL ID: {id.slice(0, 18)}...</span>
                <span style={{ fontSize: '14px', fontWeight: '900', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em' }}>OPENVEDA.IN</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
