import WSEOHead from '@/components/SEOHead';
import { useState } from 'react';

const UrlShortener = () => {
  const [url, setUrl] = useState(''); // URL to be shortened
  const [shortenedUrl, setShortenedUrl] = useState(''); // The shortened URL
  const [loading, setLoading] = useState(false); // Loading state for the request
  const [error, setError] = useState(''); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      if (response.ok) {
        setShortenedUrl(data.shortenedUrl); // Set the shortened URL
      } else {
        setError('Failed to shorten URL');
      }
    } catch (error) {
      setError('An error occurred');
    }

    setLoading(false); // Stop loading
  };

  return (
    <>
      <WSEOHead
        title="URL Shortener - TextEase"
        description="Easily shorten long URLs with our efficient and user-friendly URL shortener. Perfect for sharing links effortlessly."
        keywords="URL shortener, link shortener, text tools, TextEase"
        url="https://texteaseutils.vercel.app/utils/urlshortener"
      />
      <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">URL Shortener</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 border border-gray-300 rounded-md bg-lime-100 text-center mb-6">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL"
            className="w-full p-2 mb-4 border text-gray-950 border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-lime-600 text-white rounded-md shadow-md hover:bg-lime-700 mb-6"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortenedUrl && (
          <div className="p-4 mt-4 bg-lime-100 text-lime-600 rounded-md">
            <p>Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-blue-600">
              {shortenedUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="p-4 mt-4 bg-red-100 text-red-600 rounded-md">
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UrlShortener;
