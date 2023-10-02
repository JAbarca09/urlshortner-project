// EX Response: {"original_url":"https://www.youtube.com/watch?v=G0SXDqkMHZc&ab_channel=Vlad","short_url":17047}
// Invalid URL: { error: 'invalid url' }
const dns = require('dns');
const url = require('url');
const data = require('./data');

exports.shortenUrl = (req, res) => {
  const urlString = req.body.url;
  const parsedUrl = url.parse(urlString);

  const hostname = parsedUrl.hostname;

  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      console.error('Hostname is not resolvable:', err);
      return res.status(400).json({ error: 'invalid url' });
    } else {
      console.log('Hostname is resolvable. IP Address:', address);
      const newData = { original_url: urlString };
      data.writeData(newData, (writeErr, result) => {
        if (writeErr) {
          return res.status(500).json(writeErr);
        }

        return res.status(200).json(result);
      });
    }
  });
};

// /api/shorturl/<short_url>, will return you to the original website
exports.urlRedirection = (req, res) => {
  return res.json({ message: 'hi' });
};
