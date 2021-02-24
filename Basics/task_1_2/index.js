const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = 'Basics/task_1_2/csv/nodejs-hw1-ex1.csv';

csv().fromFile(csvFilePath).then((obj) => {
    fs.writeFileSync('Basics/task_1_2/txt/nodejs-hw1-ex2.txt', JSON.stringify(obj), 'utf-8', (err) => {
            console.log(err);
    })
}).catch((err) => console.log(err));
