# Basic comments API
Basic comments API for using on simple WEB apps.
- No Authentication
- Study purpose only, do _not_ use for production
- Really, it is _**not**_ intended for production, trust me

|||
|---|---|
|Author|Daniel Meyer Dammous|

## /comments
Supports **POST**, **GET** and **DELETE** for ```/comments``` endpoint

### GET Method
Calling endpoint with GET method will return a full array of current comments stored.

Response example (JSON):
```json
{
    "lastIndex": 2,
    "data": [
        {
            "id": 1,
            "author": "Daniel",
            "comment": "Comment #1",
            "date": "17/07/2022 01:51:20"
        },
        {
            "id": 2,
            "author": "Testman",
            "comment": "Comment #2",
            "date": "17/07/2022 01:53:39"
        }
    ]
}
```

### POST Method
Sending a POST with a body content (comment object in JSON format) will attempt to add the new comment to the stored list.

Body example (JSON):
```json
{ "author": "Testman", "comment": "A random comment that will be inserted on the list" }
```
Response will include JSON in body prop with the whole comment list, exactly the same as GET method, but with the new comment.

> **Note** 
> <br>Server will already handle adding proper values for ```id``` and ```date```.<br> No need to send them in the request body (will be ignored).

### DELETE Method
Send a DELETE with comment id as URL parameter to remove a comment from the stored list.
Response will send whole comments list updated.

Endpoint sintax:
```
(...)/comments/:id
```

Usage example to remove comment id number **7**:
```
(...)/comments/7
```

### Errors
Errors will be sent as a response in the following format:
```json
{ "error": { "internalCode": "Error_User_Input", "message": "Please do not leave any blank inputs." } }
```
```internalCode``` values are:
- Error_User_Input
- Error_Server