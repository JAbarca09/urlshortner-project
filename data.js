const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'urls.json');

function readData(callback) {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (!err) {
      try {
        const urlData = JSON.parse(data);
        callback(null, urlData);
      } catch (jsonErr) {
        callback(jsonErr);
      }
    } else {
      callback(err);
    }
  });
}

function writeData(data, callback) {
  fs.writeFile(dbFilePath, JSON.stringify(data), (writeErr) => {
    if (writeErr) {
      callback(writeErr);
    } else {
      callback(null);
    }
  });
}

module.exports = {
  readData,
  writeData,
};
