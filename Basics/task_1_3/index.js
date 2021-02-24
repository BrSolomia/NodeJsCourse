import readline from 'readline';
import { reverseString } from './reverse-string';

const consoleLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter line:'); 

consoleLine.on('line', (line) => {
    console.log(reverseString(line));
    consoleLine.close();
});
