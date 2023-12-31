// EX Response: {"original_url":"https://www.youtube.com/watch?v=G0SXDqkMHZc&ab_channel=Vlad","short_url":17047}
// Invalid URL: { error: 'invalid url' }
const dns = require('dns');
const urlparser = require('url');
const data = require('./data');


exports.shortenUrl = (req, res) => {
  const urlString = req.body.url;
  
  dns.lookup(urlparser.parse(urlString).hostname, (err, address) => {
    if (!address) {
      console.error('Hostname is not resolvable:', err);
      return res.json({ error: 'invalid url' });
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
exports.urlRedirection = async (req, res) => {
  const short_url = req.params.shorturl;

  const urlData = await data.getWebsite(short_url);
  if (!urlData) {
    return res.status(404).json({ message: 'url not found' });
  }

  return res.redirect(301, urlData['original_url']);
};
