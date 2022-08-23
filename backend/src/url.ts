import url = require('url');

const myURL = new URL('https://sub.example.com:8080/p/a/t/h?query=string&isVisible=1#hash');

console.log(myURL.href); // https://sub.example.com:8080/p/a/t/h?query=string&isVisible=1#hash
console.log(myURL.pathname); // /p/a/t/h

console.log(myURL.origin); // https://sub.example.com:8080
console.log(myURL.hostname); // sub.example.com
console.log(myURL.host); // sub.example.com:8080

console.log(myURL.search); // ?query=string
console.log(myURL.searchParams); // URLSearchParams { 'query' => 'string', 'isVisible' => '1' }
