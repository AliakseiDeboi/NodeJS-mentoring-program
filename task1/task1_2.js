import csvReader from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

const fileLocation = __dirname + '\\data.csv';
console.log(csvReader.csv())

/**
 * We will use pipeline method to avoid loading
 * of full data into the RAM.
 */
pipeline(
    fs.createReadStream(fileLocation),
    csvReader.csv({delimiter: ';'}).preFileLine((fileLine,idx)=> {
        if (idx === 0 ) {
            return fileLine.toLowerCase();
        }
        return fileLine;
    }),
    fs.createWriteStream('task1/output.txt'),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
