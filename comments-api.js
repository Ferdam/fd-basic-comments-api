import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
// var express = require("express");
const app = express();

function init(params) {    
    app.use(bodyParser.json({ type: '*/*' }));
    app.listen(3000, () => {
     console.log("Server running on port 3000");
    });

    startEndpoints();
}

function startEndpoints(params) {
    GET_Comments_Endpoint();
    POST_Comments_Endpoint();
}

function GET_Comments_Endpoint(params) {
    app.get("/comments", (req, res, next) => {
        let commentsData = JSON.parse(fs.readFileSync('./comments.json'));
        res.json(commentsData);
    });
}

function POST_Comments_Endpoint(params) {
    app.post('/comments', (req, res) => {
        try {
            console.log(req.body);
            let resObject = { error: { status: 'Error_Server', message: 'Something went wrong. Try again later.' } };
            let newComment = req.body;
            if (newComment.author && newComment.comment) {
                let commentsFile = JSON.parse(fs.readFileSync('./comments.json'));
                newComment.date = Date.now().toLocaleString('pt-br');
                commentsFile.data.push(newComment);
                fs.writeFileSync('./comments.json', JSON.stringify(commentsFile));
                resObject = commentsFile;
                res.send(commentsFile);
                return;
            }
            resObject = { error: { status: 'Error_User_Input', message: 'Please do not leave any blank inputs.' } };
        }
        catch (error) {
            res.send(resObject);
        }
    })
}

function commentsServer(params) {
    init();
}

export default commentsServer;