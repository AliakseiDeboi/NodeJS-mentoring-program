import process from 'process';

/**
 * This function reverses a string. It converts string to array,
 * than filters this array (deletes \r an \n characters), after that it uses
 * built-in reverse() function to reverse array. In the end it converts array
 * to string.
 * @param str {string}
 * @return reversed {string}
 */
const reverseString = str => {
    return Array.from(str.trim())
        .reverse()
        .join('');
}

/**
 * Setting encoding to input stream
 */
process.stdin.setEncoding('utf8');

/**
 * Listening readable stream and writing results to output stream
 */
process.stdin.on('readable', () => {
    const input = process.stdin.read();
    !!input ? process.stdout.write(reverseString(input) + '\r\n\n') : console.log('You need to write your string');
});
