const csvReader = require('csvtojson');
const { pipeline } = require('stream');
const fs = require('fs');
const fileLocation = __dirname + '\\data.csv';

/**
 * We will use pipeline method to avoid loading
 * of full data into the RAM.
 */
pipeline(
    fs.createReadStream(fileLocation),
    csvReader.csv(),
    fs.createWriteStream('task1/output.txt'),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
