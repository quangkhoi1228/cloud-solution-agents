export const dynamic = 'force-dynamic'; // Bắt buộc để stream SSE

export async function GET() {
  const backendRes = await fetch('http://localhost:8000/sse', {
    method: 'GET',
  });

  return new Response(backendRes.body, {
    status: backendRes.status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
