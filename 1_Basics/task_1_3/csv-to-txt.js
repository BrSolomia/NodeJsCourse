import csv from 'csvtojson';
import fs from 'fs';

export const csvToTxt = (fromFile, toFile) => {
    const readable = fs.createReadStream(fromFile);
    const writable = fs.createWriteStream(toFile);

    readable.on('error', (err) => {
        console.log(`Error wrile read from file: ${err.message}`);
    })

    writable.on('error', (err) => {
        console.log(`Error wrile write to file: ${err.message}`);
    })

    csv()
        .fromStream(readable)
        .subscribe((json) => {
            writable.write(JSON.stringify(json));
            writable.write('\n');
    });
}