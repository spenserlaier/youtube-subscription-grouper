


export async function GET() {
  const res = await fetch('https://bobjones.com', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
