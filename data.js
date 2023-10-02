const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'urls.json');

exports.readData = (callback) => {
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
};

// TODO
// Write a function that takes an object {original_url: x} and save it to the "backend"
// Generate a random six digit unique number for the shorturl and save it to urls.json w/ function

exports.writeData = (newData, callback) => {
  fs.readFile(dbFilePath, 'utf-8', (readErr, data) => {
    if (readErr) {
      console.error('Error reading file:', readErr);
      callback({ error: 'Internal server error' });
      return;
    }

    const urlData = JSON.parse(data);
    const usedNumbers = new Set(urlData.map((entry) => entry.short_url)); // Create a set of existing short_urls

    while (true) {
      const min = 0;
      const max = 999999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const sixDigitNumber = randomNumber.toString().padStart(6, '0');

      // Check if the generated number is unique
      if (!usedNumbers.has(sixDigitNumber)) {
        newData.short_url = sixDigitNumber; // Assign the unique number to newData
        urlData.push(newData);
        break;
      }
    }
    
    fs.writeFile(
      dbFilePath,
      JSON.stringify(urlData, null, 2),
      'utf-8',
      (writeErr) => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          callback({ error: 'Internal server error' });
          return;
        }
        callback(null, newData);
      }
    );
  });
};
