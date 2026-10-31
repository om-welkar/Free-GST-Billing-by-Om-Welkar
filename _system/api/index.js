import app from '../server.js';

export default function handler(req, res) {
  try {
    const urlObj = new URL(req.url, 'http://localhost');
    const apiPath = urlObj.searchParams.get('_apiPath');
    if (apiPath !== null && apiPath !== undefined) {
      urlObj.searchParams.delete('_apiPath');
      const search = urlObj.searchParams.toString();
      req.url = '/api/' + apiPath + (search ? '?' + search : '');
    } else if (!req.url.startsWith('/api')) {
      req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
    }
  } catch (e) {
    // fallback
  }
  return app(req, res);
}
