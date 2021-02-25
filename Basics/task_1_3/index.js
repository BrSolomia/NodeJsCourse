import readline from 'readline';
import { reverseString } from './reverse-string';
import { csvToTxt } from './csv-to-txt';

const consoleLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter line:'); 

consoleLine.on('line', (line) => {
    console.log(reverseString(line));
    consoleLine.close();
});

csvToTxt('Basics/task_1_2/csv/nodejs-hw1-ex1.csv', 'Basics/task_1_2/txt/nodejs-hw1-ex2.txt');
