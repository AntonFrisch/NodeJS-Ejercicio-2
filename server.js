
const http = require('http');
const fs = require('fs');
const url = require('url');

const dictionary = './NodeJs_Ejercicio_Dictionary.txt';

const generatePassword = (wordCount, wordList) => {
    let password = '';
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        password += wordList[randomIndex];
    }
    return password;
};

fs.readFile(dictionary, 'utf8', (err, data) => {
    if (err) throw err;

    const dictionaryWords = data.split('\n');
    const server = http.createServer((req, res) => {
        const queryObject = url.parse(req.url, true).query;
        const wordCount = parseInt(queryObject.x);

        const password = generatePassword(wordCount, dictionaryWords);
        res.end(password);

    });

    server.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});