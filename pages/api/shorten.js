// pages/api/shorten.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { url } = JSON.parse(req.body);
  
      // Bitly API token (replace with your actual Bitly API token)
      const bitlyAccessToken = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;
  
      try {
        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bitlyAccessToken}`,
          },
          body: JSON.stringify({
            long_url: url,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Return the shortened URL
          res.status(200).json({ shortenedUrl: data.link });
        } else {
          res.status(400).json({ error: 'Error shortening URL' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  