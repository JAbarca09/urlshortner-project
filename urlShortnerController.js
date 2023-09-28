// EX Response: {"original_url":"https://www.youtube.com/watch?v=G0SXDqkMHZc&ab_channel=Vlad","short_url":17047}
// Invalid URL: { error: 'invalid url' }
exports.shortenUrl = (req, res) => {
    return res.json({url: req.params.shorturl});
};


// /api/shorturl/<short_url>, will return you to the original website
exports.urlRedirection = (req, res) => {
    return res.json({message:"hi"});
};