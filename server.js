import commentsServer from './comments-api.js'
import fetch from 'node-fetch';

commentsServer();

// let bori = {"author":"Testman", "comment":"Another comment"};
// fetch('http://localhost:5000/comments', 
// {
//     body: JSON.stringify(bori),
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'}
// });

// fetch('http://localhost:5000/comments/7', 
// {
//     method: 'DELETE',
// });
