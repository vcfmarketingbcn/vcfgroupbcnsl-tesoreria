export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'text/csv';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
