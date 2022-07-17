import commentsServer from './comments-api.js'
import nfetch from 'node-fetch';

commentsServer();

// let req = new Request();
// req.body = {author: 'Test', comment: 'Test comment'};
// req.headers.
let bori = {"author":"Testy", "comment":"commentsss"};
nfetch('http://localhost:3000/comments', 
{
    body: JSON.stringify(bori),
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
});
// setTimeout( 
//     async () => {
//         let resp = await fetch('http://localhost:3000/comments');
//         console.log( await resp.json())
//     },
//     3500
// )